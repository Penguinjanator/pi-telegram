# Project Backlog

_This file owns unresolved project work only. Completed behavior belongs in `CHANGELOG.md`; durable contracts belong in `AGENTS.md` and `/docs`._

## Disposable Thread live acceptance

- [ ] After separate operator authorization, use disposable Telegram tabs to check leader Settings review/Back, one confirmed cleanup of an inactive slotless binding, preservation of its replacement letter holder, and visible outcome/recovery copy. Native filesystem and injected-transport tests do not prove live Telegram/client or native Windows acceptance. Never use production history as the disposable fixture.
- [ ] On separately authorized disposable routing tabs, verify pending-choice protection, Cancel after the view becomes unavailable, expiry notice in the owned leader Thread and no duplicate deletion after an unknown outcome. Local native journal/API-decoder fixtures are not live client acceptance.

## Typing authority during Telegram turns

Live report on package 0.58.2 and Pi 1.4.0: every Telegram turn logged `sendChatAction: Telegram API call authority is unavailable` in a connected, long-lived session. The reporter's leader/follower role and refusal stage are not yet known. Prompt-cache acceptance is complete; this is a separate typing-indicator investigation.

The native expired-loop diagnostic case is corrected: real typing loop/starter, direct API runtime and API client regressions cover mocked HTTP 200 after stop/same-target replacement, with unchanged session generation and transport epoch. A process-local ended-loop observation suppresses only the corresponding typed authority diagnostic; the request still rejects, active-owner refusals remain visible, and no callback crosses IPC. Real-client regressions retain the original HTTP/network failure when authority expires during error handling; a native follower caller rejects a delayed ACK after its local owner ends, without replay. Direct/follower and Classic/Threaded paths remain distinct from live acceptance. This does not establish the cause of the reporter's live failure or prove client typing.

- [ ] Correlate the live report with the corrected native case using only redacted leader/follower role, timing around loop end/replacement and refusal-stage evidence if available. Do not infer transport loss or widen authority from the error string alone; isolate any distinct current-owner refusal before another runtime change.
- [ ] After separately approved live validation, confirm client typing and absence of expired-loop API noise across Telegram turns and loop replacement. Preserve exact Thread targeting, independent Thread requests, best-effort presence and no unhealthy-status escalation; local native fixtures are not live acceptance.

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

## Passive-child cold-import follow-up

The 0.57.8 tag validation failed `Child process sharing the agent dir does not poll while parent owns Telegram lock` even when that file ran alone: `Child process did not exit. stdout= stderr=` at its existing child deadline. The other seven process tests and the identical pre-merge tree passed. That historical failure has no child-stage trace, so cold import, startup and a retained runtime handle remain competing explanations. Bounded diagnostic sampling is exhausted; passing traces showed imports up to 4.37 seconds against the five-second non-Windows child budget and natural exit within 8–14 ms after the event-loop checkpoint. These traces do not identify the original cause. A later main-validation recurrence stopped after `eval` and `import-start`, with parent-clock `elapsedMs=5009` and no import-complete checkpoint. That trace locates this recurrence before import completion, not in natural exit or a retained post-checkpoint handle; the slow dependency/startup cause remains unknown. The minor release's independent tag-owned validation passed the same committed tree, which does not erase that historical failed main check. The initial hotfix candidate then showed the same pre-import-completion state on Ubuntu at `elapsedMs=5026`; the recurrence is not macOS-only. Slow dependency/startup cost remains unexplained, separate from the fixture's corrected startup/exit observation contract.
- [ ] On a genuinely failing cold-import trace under the phase-owned fixture, isolate dependency/startup cost using its actual overall/exit deadline and stage evidence before changing runtime imports or budgets. Preserve natural-exit/no-poll assertions and job budgets. Do not spend unchanged-head diagnostic samples or infer runner contention or the historical cause from passing runs.

## Windows Workspace-gate fixture timeout

`Leader assembly serializes follower provisioning through its shared Workspace gate` once exceeded its generic one-second bus-response deadline. It sends `follower.register` directly, outside the changed API caller; production registration has a separate budget. The later native standalone witness acknowledged at about 90 ms, and the full suite passed, but the original failure has no gate/persistence trace. A synthetic delayed-write probe verifies diagnostic capture, not the native cause.
- [ ] Use the next genuinely failing native trace to distinguish gate wait, persistence and acknowledgement delay before correcting this fixture or runtime. Retain its bounded stage evidence and standalone/full-suite execution; do not spend unchanged-head reruns or infer a cause from passing checks. Any deadline-policy correction must be justified against the registration owner's contract, not a guessed larger timeout.
