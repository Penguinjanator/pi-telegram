# Project Backlog

_This file owns unresolved project work only. Completed behavior belongs in `CHANGELOG.md`; durable contracts belong in `AGENTS.md` and `/docs`._

## 0.58.1 publication checkpoint

- [ ] Publish the independent Thread chat-action fix through the protected dev-to-main path, requiring fresh Ubuntu, Windows and both macOS shard checks at the exact candidate head and candidate/merged-tree equality. Keep the immutable Connect-only minor unchanged and verify its publication before issuing the hotfix tag.
- [ ] Verify the hotfix GitHub Release and public npm latest, exact tag/gitHead identity, canonical notes, packed runtime/skills and provenance before closing this checkpoint. No live session reload or Telegram probes; controlled transport tests do not prove live client presence.

## Disposable Thread live acceptance

- [ ] After separate operator authorization, use disposable Telegram tabs to check leader Settings review/Back, one confirmed cleanup of an inactive slotless binding, preservation of its replacement letter holder, and visible outcome/recovery copy. Native filesystem and injected-transport tests do not prove live Telegram/client or native Windows acceptance. Never use production history as the disposable fixture.
- [ ] On separately authorized disposable routing tabs, verify pending-choice protection, Cancel after the view becomes unavailable, expiry notice in the owned leader Thread and no duplicate deletion after an unknown outcome. Local native journal/API-decoder fixtures are not live client acceptance.

## Prompt-cache live confirmation

The prompt-cache report remains open for the reporter's offered live Anthropic capture after the published fix. Native request/transcript checks do not replace cache-hit or signed-thinking measurements.

- [ ] Review the reporter's resume and mid-session tool-change results (versions, cache read/write counts and new thinking-drop events). Close the report if the live evidence confirms the fix, or narrow any residual failure into actionable follow-up. Do not reconstruct or claim recovery of previously lost thinking blocks.

## Stuck forwarded command after Thread re-creation

Evidence (2026-10-23 07:11–07:16): a `/start` sent in a former leader tab moved into a follower's journal as a raw original. After that follower's Thread was re-created by the restore probe, every execution attempt failed with `Telegram bus API call is not allowed for this follower` and retried every 60 s indefinitely, because the reply targeted a Thread the follower no longer owned. Terminal settlement alone is unsafe: the same rejection can be a benign race during a live-rebind pre-dispatch.

### Post-refusal reply-only recovery — deferred contract gate

Remaining scope is recovery after a reply is refused or recipient authority changes during publication, not initial destination selection. The latter is specified under the [reply ownership boundary](./docs/multi-instance-bus.md#reply-recovery-ownership-boundary); its native regression covers a stale source address, not the historical refusal itself or live Telegram restoration.

A target-scoped reply refusal cannot prove that a command made no prior effects. Keep the handler-replay containment while preparing a replacement: unresolved inputs must remain in ordinary durable retry state, not be silently completed or retargeted as whole commands. Ordinary journal execution remains at-least-once, not globally exactly-once.

- [ ] Obtain explicit approval for a post-refusal recipient-delivery contract, then implement recipient-scoped reply-only recovery under the [reply ownership boundary](./docs/multi-instance-bus.md#reply-recovery-ownership-boundary), outside the containment hotfix. No ordinary recipient-scoped send grant is composed today: the local execution fence and queue-owner identity are insufficient, and receipt/admission namespaces cannot substitute for the registered recipient profile key. Ordinary sends return only a message ID, so the menu/delivery owner must participate in any destination change. Reuse selected-menu delivery only with its exact retained live-rebind/source grant; a raw journaled command cannot borrow it. Capture and recheck recipient/profile/session/registration authority at both ends, with no widening of the ordinary proxy.
- [ ] Prove the reply-only path with the real follower API caller and worker: one replacement send before any reply chunk is acknowledged, consistent callback/message ownership and destination across every chunk, no stale reply anchor, no recovery for deletion/editing/unknown or lost ACKs, and no second send after authority changes. A command effect before a refused reply must execute once within that admission attempt; original journal evidence stays unchanged and diagnostics cannot change a successful outcome. Run typecheck and the full suite at the stable boundary. If these proofs cannot be supplied, retain the input without handler re-entry.
- [ ] Live acceptance after the reply-only recovery checkpoint: a forwarded command whose follower Thread was re-created is answered in the current Thread (disposable tabs only).

### Remaining routing investigation

- [ ] Find why the temporary tab's selected `/start` stayed unresolved until expiry, and why that Restore moved custody without applying the rebind.
- [ ] Route an input that arrives in a tab bound to nothing through a fresh temporary routing tab (the All flow) instead of publishing the chooser in the orphan, deleting the orphan with it once nothing unspent remains. Needs its own durable-metadata design.
- [ ] Live acceptance on disposable tabs only: Cancel on an orphan tab deletes it; a second unspent input keeps it until the last Cancel; a plain `std::map` option button is delivered as an ordinary prompt.

## macOS process-exit test flake

The 0.57.8 tag validation failed `Child process sharing the agent dir does not poll while parent owns Telegram lock` even when that file ran alone: `Child process did not exit. stdout= stderr=` at its existing child deadline. The other seven process tests and the identical pre-merge tree passed. That historical failure has no child-stage trace, so cold import, startup and a retained runtime handle remain competing explanations. Bounded diagnostic sampling is exhausted; passing traces showed imports up to 4.37 seconds against the five-second non-Windows child budget and natural exit within 8–14 ms after the event-loop checkpoint. These traces do not identify the original cause. A later main-validation recurrence stopped after `eval` and `import-start`, with parent-clock `elapsedMs=5009` and no import-complete checkpoint. That trace locates this recurrence before import completion, not in natural exit or a retained post-checkpoint handle; the slow dependency/startup cause remains unknown. The independent tag-owned Release validation passed the same committed tree, which does not erase the failed main check.
- [ ] Use the recorded cold-import-stage failure to isolate dependency/startup cost before changing fixture phase budgets or runtime imports. Preserve the passive child's natural-exit assertion and separate parent shutdown; never add shutdown or force exit to make it pass. Do not spend more unchanged-head diagnostic samples. Any fixture/runtime correction needs failing-stage evidence and fresh complete platform checks; do not blindly widen deadlines or claim measured runner contention.

## Windows Workspace-gate fixture timeout

`Leader assembly serializes follower provisioning through its shared Workspace gate` once exceeded its generic one-second bus-response deadline. It sends `follower.register` directly, outside the changed API caller; production registration has a separate budget. The later native standalone witness acknowledged at about 90 ms, and the full suite passed, but the original failure has no gate/persistence trace. A synthetic delayed-write probe verifies diagnostic capture, not the native cause.
- [ ] Use the next genuinely failing native trace to distinguish gate wait, persistence and acknowledgement delay before correcting this fixture or runtime. Retain its bounded stage evidence and standalone/full-suite execution; do not spend unchanged-head reruns or infer a cause from passing checks. Any deadline-policy correction must be justified against the registration owner's contract, not a guessed larger timeout.
