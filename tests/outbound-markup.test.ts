/**
 * Regression tests for Telegram outbound markup helpers
 * Exercises delimiter-based assistant action comment parsing, stripping, and voice reply planning
 */

import assert from "node:assert/strict";
import test from "node:test";

import {
  collectTelegramHtmlComments,
  getTelegramActionString,
  planTelegramVoiceReply,
  stripTelegramCommentMarkupForDelivery,
  stripTelegramCommentMarkupForPreview,
} from "../lib/outbound-markup.ts";

test("Action string fields trim exactly once without coercion or payload mutation", () => {
  for (const value of [undefined, null, 1, false, {}, [], new String("text"), "", " \t\n"]) {
    assert.equal(getTelegramActionString({ value }, "value"), undefined);
  }
  assert.equal(getTelegramActionString({ value: "\t label \n" }, "value"), "label");
  assert.equal(getTelegramActionString({}, "missing"), undefined);
  let reads = 0;
  const payload = { get value() { reads++; return " text "; } };
  assert.equal(getTelegramActionString(payload, "value"), "text");
  assert.equal(reads, 1);
  assert.ok(Object.getOwnPropertyDescriptor(payload, "value")?.get);
});

test("Drafts hide complete and unfinished button fences but preserve outer code examples", () => {
  assert.equal(stripTelegramCommentMarkupForPreview('Before\n```telegram_button\n{Hidden|secret prompt}'), 'Before');
  assert.equal(stripTelegramCommentMarkupForPreview('Before\n```telegram_button\n{Hidden}\n```\nAfter'), 'Before\n\nAfter');
  const example = '````markdown\n```telegram_button\n{Literal}\n```\n````';
  assert.equal(stripTelegramCommentMarkupForPreview(example), example);
});

test("Drafts hide relaxed button fences without activating or exposing payloads", () => {
  for (const marker of ["`", "~"]) {
    const opening = ` \t${marker.repeat(4)} \ttelegram_button \t`;
    for (const tail of ["", `\n\t${marker.repeat(5)}\nAfter`]) {
      const preview = stripTelegramCommentMarkupForPreview(`Before\n${opening}\n{Hidden|secret prompt}${tail}`);
      assert.equal(preview, tail ? "Before\n\nAfter" : "Before");
      assert.doesNotMatch(preview, /secret|telegram_button/u);
    }
    const example = `    ${marker.repeat(5)}markdown\n${opening}\n{Literal}\n${marker.repeat(4)}\n    ${marker.repeat(5)}`;
    assert.equal(stripTelegramCommentMarkupForPreview(example), example.trim());
  }
});

test("Action comments depend only on delimiters and payload, retaining exact source spans", () => {
  const raw = '<!-- telegram_voice {Speak.|en} -->';
  for (const [before, after] of [
    ["", ""], [" ", " "], ["    ", ""], ["\t", ""], [" \t  ", ""],
    ["Text ", " tail"], ["> ", ""], ["- ", ""], ["1. ", ""],
    ["`", "`"], ["```md\n", "\n```"], ["~~~~md\n", "\n~~~~"],
    ["\\", ""],
  ]) {
    const markdown = `Before\r\n${before}${raw}${after}\r\nAfter`;
    const { comments } = collectTelegramHtmlComments(markdown);
    assert.equal(comments.length, 1);
    assert.equal(comments[0]?.raw, raw);
    assert.equal(markdown.slice(comments[0]!.start, comments[0]!.end), raw);
    const plan = planTelegramVoiceReply(markdown);
    assert.deepEqual(plan.voiceReplies, [{ text: "Speak.", lang: "en" }]);
    assert.equal(plan.markdown, `Before\r\n${before}${after}\r\nAfter`);
  }
});

test("Adjacent comments on one line are independent and open tails never activate", () => {
  const first = '<!-- telegram_voice {First.} -->';
  const second = '<!-- telegram_voice {Second.} -->';
  const markdown = `Text ${first}${second} tail <!-- telegram_voice {Unfinished.}`;
  const result = collectTelegramHtmlComments(markdown);
  assert.deepEqual(result.comments.map((comment) => comment.raw), [first, second]);
  assert.equal(result.openCommentStart, markdown.lastIndexOf("<!--"));
  assert.deepEqual(planTelegramVoiceReply(markdown).voiceReplies, [
    { text: "First." }, { text: "Second." },
  ]);
  assert.equal(planTelegramVoiceReply(markdown).markdown, "Text  tail");
  for (const tail of ["<", "<!", "<!-", "<!-- private"]) {
    assert.equal(stripTelegramCommentMarkupForPreview(`Text ${tail}`), "Text");
    assert.equal(stripTelegramCommentMarkupForDelivery(`Text ${tail}`), "Text");
  }
  for (const literal of ["&lt;!-- telegram_voice {Example.} --&gt;", "< !-- telegram_voice {Invalid.} -->"]) {
    assert.deepEqual(collectTelegramHtmlComments(literal).comments, []);
    assert.equal(planTelegramVoiceReply(literal).voiceReplies, undefined);
  }
});

test("Markup stripping removes every HTML comment from Telegram surfaces", () => {
  const markdown = [
    "Visible <!-- inline --> text.",
    "",
    "> Quoted <!-- private quote --> text.",
    "",
    "- Listed <!-- private list --> text.",
    "",
    "```md",
    "<!-- private code example -->",
    "const visible = true;",
    "```",
  ].join("\n");
  const delivery = stripTelegramCommentMarkupForDelivery(markdown);
  const preview = stripTelegramCommentMarkupForPreview(markdown);

  assert.equal(delivery, preview);
  assert.doesNotMatch(delivery, /<!--|-->/u);
  assert.match(delivery, /Visible  text\./u);
  assert.match(delivery, /> Quoted  text\./u);
  assert.match(delivery, /- Listed  text\./u);
  assert.match(delivery, /const visible = true;/u);
  assert.equal(
    stripTelegramCommentMarkupForDelivery(
      " \n<!-- first -->\n<!-- second -->\n ",
    ),
    "",
  );
  assert.equal(
    stripTelegramCommentMarkupForPreview("Visible\n\n<!-- streaming private tail"),
    "Visible",
  );
});

test("Voice reply planner retains legacy attribute compatibility", () => {
  const plan = planTelegramVoiceReply(
    [
      "Visible answer.",
      "",
      '<!-- telegram_voice {"text":"JSON voice.","lang":"ru"} -->',
      '<!-- telegram_voice {"text":"Rated JSON voice.","rate":"+10%"} -->',
      '<!-- telegram_voice text="Attribute voice." lang="en" -->',
      '<!-- telegram_voice {"value":"JSON value voice."} -->',
      '<!-- telegram_voice value="Attribute value voice." -->',
      '<!-- telegram_voice {"value":"Fallback voice.","text":"Explicit voice."} -->',
      '<!-- telegram_voice {Keep this voice.} [unrelated envelope text] -->',
    ].join("\n"),
  );

  assert.equal(plan.markdown, "Visible answer.");
  assert.deepEqual(plan.voiceReplies, [
    { text: "JSON voice.", lang: "ru" },
    { text: "Rated JSON voice.", rate: "+10%" },
    { text: "Attribute voice.", lang: "en" },
    { text: "JSON value voice." },
    { text: "Attribute value voice." },
    { text: "Explicit voice." },
    { text: "Keep this voice." },
  ]);
});

test("Voice reply planner ignores payloads outside the canonical action shape", () => {
  const plan = planTelegramVoiceReply(
    [
      '<!-- telegram_voice [{"text":"Array is unsupported."}] -->',
      '<!-- telegram_voice {"lang":"ru"} -->',
      '<!-- telegram_voice {"text": -->',
      '<!-- telegram_voice {"text":"Must not become CML","rate":} -->',
      '<!-- telegram_voice unknown="Speak this." -->',
      '<!-- telegram_voice [broken text=Must-not-recover] -->',
      '<!-- telegram_voice [[{Matrix is unsupported.}]] -->',
      '<!-- telegram_voice {|en} -->',
      '<!-- telegram_voice {Too|many|voice|atoms} -->',
    ].join("\n"),
  );

  assert.equal(plan.voiceText, undefined);
  assert.equal(plan.voiceReplies, undefined);
  assert.equal(plan.markdown, "");
});

test("Voice reply planner extracts multiple voice replies and cleans markdown", () => {
  const plan = planTelegramVoiceReply(
    [
      "Visible answer.",
      "",
      '<!-- telegram_voice {"text":"Первый ответ.","lang":"ru","rate":"+20%"} -->',
      "",
      '<!-- telegram_voice lang="en" text="Second answer." -->',
      "",
      "Tail.",
    ].join("\n"),
  );

  assert.equal(plan.markdown, "Visible answer.\n\nTail.");
  assert.equal(plan.voiceText, "Первый ответ.\n\nSecond answer.");
  assert.deepEqual(plan.voiceReplies, [
    { text: "Первый ответ.", lang: "ru", rate: "+20%" },
    { text: "Second answer.", lang: "en" },
  ]);
  assert.equal(plan.lang, "en");
  assert.equal(plan.rate, "+20%");
});
