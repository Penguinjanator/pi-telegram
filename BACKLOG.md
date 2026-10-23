# Project Backlog

_This file owns unresolved project work only. Completed behavior belongs in `CHANGELOG.md`; durable contracts belong in `AGENTS.md` and `/docs`._

## Containment hotfix publication blocked

The 0.57.8 candidate passed its three-platform pre-merge checks, was merged to main and tagged at `7f17c95167c8703444f904ced9e66ee58682b64d`, but the tag workflow failed its isolated macOS process-exit test and skipped publication. No matching GitHub Release or npm version exists; 0.57.7 remains latest. Preserve the tag and merged history. Handler-replay containment and structured refusal evidence are on main, not a completed release. Ordinary retries remain at-least-once and stale-Thread recovery remains unresolved.

- [ ] Diagnose the isolated macOS failure under the checkpoint below before selecting a release recovery. Do not silently retry until green, retag, or publish manually. Resume through the owning workflow only with an evidence-based recovery decision; if a new commit is required, retain the existing tag and use the guarded next-patch path unless exact unpublished-tag replacement is separately authorized.

## Disposable Thread live acceptance

- [ ] After separate operator authorization, use disposable Telegram tabs to check leader Settings review/Back, one confirmed cleanup of an inactive slotless binding, preservation of its replacement letter holder, and visible outcome/recovery copy. Native filesystem and injected-transport tests do not prove live Telegram/client or native Windows acceptance. Never use production history as the disposable fixture.
- [ ] On separately authorized disposable routing tabs, verify pending-choice protection, Cancel after the view becomes unavailable, expiry notice in the owned leader Thread and no duplicate deletion after an unknown outcome. Local native journal/API-decoder fixtures are not live client acceptance.

## Prompt-cache live confirmation

The prompt-cache report remains open for the reporter's offered live Anthropic capture after the published fix. Native request/transcript checks do not replace cache-hit or signed-thinking measurements.

- [ ] Review the reporter's resume and mid-session tool-change results (versions, cache read/write counts and new thinking-drop events). Close the report if the live evidence confirms the fix, or narrow any residual failure into actionable follow-up. Do not reconstruct or claim recovery of previously lost thinking blocks.

## Stuck forwarded command after Thread re-creation

Evidence (2026-10-23 07:11–07:16): a `/start` sent in a former leader tab moved into a follower's journal as a raw original. After that follower's Thread was re-created by the restore probe, every execution attempt failed with `Telegram bus API call is not allowed for this follower` and retried every 60 s indefinitely, because the reply targeted a Thread the follower no longer owned. Terminal settlement alone is unsafe: the same rejection can be a benign race during a live-rebind pre-dispatch.

### Reply-only recovery — next stabilization checkpoint

A target-scoped reply refusal cannot prove that a command made no prior effects. Keep the handler-replay containment while preparing a replacement: unresolved inputs must remain in ordinary durable retry state, not be silently completed or retargeted as whole commands. Ordinary journal execution remains at-least-once, not globally exactly-once.

- [ ] Implement a recipient-scoped reply-only recovery under the [reply ownership boundary](./docs/multi-instance-bus.md#reply-recovery-ownership-boundary), outside the containment hotfix. Ordinary sends return only a message ID, so the menu/delivery owner must participate in any destination change. Reuse selected-menu delivery only with its exact retained live-rebind/source grant; a raw journaled command cannot borrow it. Capture and recheck recipient/profile/session/registration authority at both ends, with no widening of the ordinary proxy.
- [ ] Prove the reply-only path with the real follower API caller and worker: one replacement send before any reply chunk is acknowledged, consistent callback/message ownership and destination across every chunk, no stale reply anchor, no recovery for deletion/editing/unknown or lost ACKs, and no second send after authority changes. A command effect before a refused reply must execute once within that admission attempt; original journal evidence stays unchanged and diagnostics cannot change a successful outcome. Run typecheck and the full suite at the stable boundary. If these proofs cannot be supplied, retain the input without handler re-entry.
- [ ] Live acceptance after the reply-only recovery checkpoint: a forwarded command whose follower Thread was re-created is answered in the current Thread (disposable tabs only).

### Remaining routing investigation

- [ ] Find why the temporary tab's selected `/start` stayed unresolved until expiry, and why that Restore moved custody without applying the rebind.
- [ ] Route an input that arrives in a tab bound to nothing through a fresh temporary routing tab (the All flow) instead of publishing the chooser in the orphan, deleting the orphan with it once nothing unspent remains. Needs its own durable-metadata design.
- [ ] Live acceptance on disposable tabs only: Cancel on an orphan tab deletes it; a second unspent input keeps it until the last Cancel; a plain `std::map` option button is delivered as an ordinary prompt.

## macOS process-exit test flake

Isolation reduced observed failures but did not eliminate them: the 0.57.8 tag validation failed `Child process sharing the agent dir does not poll while parent owns Telegram lock` even when that file ran alone. The failure was `Child process did not exit. stdout= stderr=` at its existing child deadline; the other seven process tests passed. The identical tree passed the pre-merge macOS matrix. Slow cold import, startup or shutdown, and a retained runtime handle are still competing explanations; current logs cannot distinguish them.

- [ ] Add bounded child-stage timing and shutdown-handle diagnostics to the failing fixture so the next macOS run distinguishes spawn/import, session startup, session shutdown and post-shutdown exit. Keep assertions and deadlines unchanged, avoid logging credentials/agent paths, and verify diagnostics locally with an injected stall before seeking CI evidence.
- [ ] Use that evidence to correct the fixture or runtime cause, then require fresh platform CI before resuming the release. Do not widen deadlines or describe the runner as the proven cause without measurement.
