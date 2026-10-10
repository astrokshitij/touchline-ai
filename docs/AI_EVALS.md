# AI evals: how AI output on this project was checked

This is the method and the evidence behind the "AI evals" section of the case-study page. Every number on the page comes from [`ai-evals/claims-ledger.csv`](ai-evals/claims-ledger.csv). Run `node docs/ai-evals/count.mjs` to recount it. The browser tests fail if the page and the ledger disagree.

> **What this is not.** No AI model was built or evaluated in this project, and no accuracy claim is made. This is an audit of AI-**drafted text and code** (documents and a prototype). The plan for evaluating a future detection model is separate: `projects/06-premortem-and-ai-eval-plan`.

## 1. What was counted, and how

**Unit.** One *ledger entry* is one row of the two claim tables in `docs/CLAIMS_AND_EVIDENCE.md` (section B, "What changed and why", and section C, "Checked against the assessment brief"). A row can bundle several phrases (for example the invented causes in P1-03), so the count is of rows, not of individual sentences.

**Where the entries come from.** Not from memory. The git history shows two review passes of the claims document:

| Pass | Commit | Date | What the reviewer had | Entries |
|---|---|---|---|---|
| 1 | `1e7c411` | 10 Oct 2026 | This repo only. No original brief. Checks were against the repo's own files, its AI log and arithmetic | 20 (section B) |
| 2 | `d2300a7` | 10 Oct 2026 | The original brief, supplied by the author | 14 (section C, after one merge) |

Section C has 15 rows. Its last row (confidence values and technical causes) repeats entries P1-02 and P1-03, so it is counted once, not twice. That leaves 20 + 14 = **34 entries**.

**Verdicts.** Assigned by reading the "Problem" or "Result" text of each row. They are classifications, not measurements, and the author should review them. They can be changed in the CSV.

| Verdict | Meaning |
|---|---|
| `supported` | Matches the original brief |
| `no_source` | A fact, number, cause, approval or estimate that no source gives |
| `overstated` | Has some basis but is stated more strongly than the evidence allows |
| `contradicted` | Conflicts with the brief or with the test run |
| `inconsistent` | Conflicts with another part of the repo (naming, a metric definition) |
| `not_checkable` | Not in the brief by design: it comes from the author's own submission or is a proposal, and is labelled so |
| `open` | Cannot be settled without the original brief |

## 2. Result (passes 1 and 2)

| | Entries |
|---|---|
| **Checked** | **34** |
| Supported | 8 |
| **Unsupported** (no source 12 + overstated 7 + contradicted 3) | **22** |
| Inconsistent inside the repo | 3 |
| Not checkable against the brief (author-sourced, labelled) | 1 |

P1-20 was first classed as inconsistent. The brief later showed the survey was of parents, so "coaches and parents" was wrong, and it is now `contradicted`.

Of the 14 entries checked against the original brief (pass 2): 8 supported, 5 unsupported (4 with no source, 1 contradicted), 1 not checkable.

**Where the problems came from.** Of the 25 problem entries (everything that is not supported and not "not checkable"), 24 are already present in the first commit `15becab`. One (P1-14) could not be pinned to a commit. The git author of `15becab` is the author's own account, so **git cannot show which AI tool drafted the text**. That attribution rests on the author's statement and on `logs/AGENTIC_WORKFLOW.md`.

**What pass 1 missed.** Pass 1 had no brief. It found 20 internal problems, but it listed the ticket numbers, the notification figures and the recap details as items to "check against the originals" and left them in place labelled as source. Pass 2 showed that five such entries (P2-09 to P2-13) had no source or were wrong. Pass 1 also softened an invented effort figure to "a proposed 8-week build" (P1-08); pass 2 removed it. So a review that does not hold the source cannot catch invented facts, and a fix can carry the same fault.

## 3. Pass 3 (21 entries, counted separately)

Pass 3 has three parts, all after the first two passes:

- **While building the section (P3-01 to P3-09).** Five statistics were recomputed with a script and all matched (P3-02 to P3-06). Three statements were wrong or stale and were fixed: the page said "80 automated browser checks" when the suite had 92 (P3-01), and the README top note and the claims document's label table still said the scenario figures were "not re-checked" after pass 2 had checked them (P3-08, P3-09). The survey wording question (P3-07) was settled later from the brief: "Quarterly parent survey (210 respondents across 40 clubs)".
- **After an independent outside review of the repo (P3-10 to P3-16).** The reviewer did not have the brief. It found more stale labels (P3-10), a derived figure labelled Source (P3-11), overstated memo lines (P3-12, P3-13), a ticket count error (P3-14), overstated page wording (P3-15) and an overclaim in the workflow log (P3-16). The same review found three questions an engineer would have to ask of the PRD; they are answered as proposals in the PRD's "v1 scope decisions".
- **After the author's original files were checked (P3-17 to P3-21).** This found errors made by the audit itself: a memo line saying the brief mentions no threat to leave, when the VP of Sales reports the director will take it to her board as a reason to shop around (P3-17); and a ledger row with an unquoted comma that the counting script silently dropped, so the live page undercounted pass 3 by one (P3-21). `count.mjs` now stops on any malformed row. It also found model versions and some quoted AI text in the repo's copy of the workflow log that the original AI-use log does not contain (P3-18, P3-19), and confirmed the prioritisation weights and scores against the submission (P3-20).

Totals for pass 3: 7 supported, 14 fixed (8 contradicted, 5 overstated, 1 no source), 0 open. The audit's own fixes missed items and added two errors of their own, which repeats the pass 1 lesson.

Not recomputed: the experiment's "about 1,900 guardians per arm" (it rests on an assumed design effect) and the other figures in `projects/04`.

## 4. The author's original AI-use log (10 entries, group A, counted separately)

The author kept an AI-use log during the assessment (`workspace/AI_USE_LOG.md`, outside this repo). It has 14 entries. On 10 October 2026 the author's local copy was read and quoted for this audit. Ten problems with AI output are recorded in it:

| ID | What was found | Kind | What was done |
|---|---|---|---|
| A-01 | Gemini restated about 30% unopened reels as nearly a third of users never receiving value | Overstated | Rejected; reels kept apart from users |
| A-02 | Gemini diagnosed an OCR segmentation flaw | No source | Rejected; no source gives a diagnosis |
| A-03 | Decision card carried 95% and five minutes with unsupported precision | Overstated | Made placeholders; conditional livestream pilot |
| A-04 | Builder proposed partial publication of a batch | Defect | Replaced by blocking invalid batches |
| A-05 | Builder added bulk confirmation while reporting passing tests | Defect | Removed after reading the code against FR-6, FR-7, FR-21 |
| A-06 | Builder's success message made an unaudited zero-wrong-child claim | Overstated | Replaced with simulated wording |
| A-07 | Publish action did not revalidate | Defect | Fixed |
| A-08 | Builder output carried incorrect tags | Defect | Fixed (the log does not say which) |
| A-09 | Spec had contradictory failure-readiness rules | Inconsistent | Raw detection separated from processing readiness |
| A-10 | Spec left mixed-game weekly success undefined | Inconsistent | Defined |

Totals: 1 no source, 3 overstated, 2 inconsistent, 4 defects.

What the original log also records:
- Gemini became unavailable. A separate ChatGPT reviewer stood in. The submission calls that "a second review, not an independent model family".
- One rubric result is recorded in the submission: a spec (B2) checkpoint with every criterion at 4 or 5, gates passed, verdict SHIP, from that stand-in reviewer. The outside review of the later repo found three blocking questions in the PRD. The documents are different versions and both are reviewer judgments.
- The weighted decision totals were checked with a script.

**The repo copy of the workflow log differs from the original.** `logs/AGENTIC_WORKFLOW.md` names "ChatGPT-4o" and "Gemini 1.5 / 3.8" and quotes AI outputs ("fabric folds", "raw database schema definitions", a "9 Matches" button label, "12 automated test cases"). The original AI-use log has none of these details: it says "ChatGPT" and "Gemini" with no versions and gives shorter descriptions. The repo copy is annotated and not rewritten, and the page uses only the original log's facts.

**Not published:** a separate reviewer-written evaluation of the original submission, with scores and hiring-style judgments, exists in the author's files. It is not an employer result and it is personal to the author, so no part of it is on the page.

## 4b. The rubric behind the checks (author-supplied)

The author supplied the scoring rubric used to plan the original assessment (gates, a verdict rule, an ingest check, per-task rubrics and a slop checklist). A paraphrase is in [`ai-evals/ORIGINAL_RUBRIC.md`](ai-evals/ORIGINAL_RUBRIC.md). It is a design. The scores from the original run are not in this repo except for the one B2 result in section 4, so no others are reported. Its Layer C slop checklist was re-run over the new text in this section (no em dashes, no stock phrases, counts tied to the ledger).

## 5. Limits of these numbers

- **Not an error rate.** The ledger holds the claims that were flagged or chosen for checking. It is not a random sample of everything in the repo. 22 of 34 must not be read as "65% of AI claims are wrong".
- **Rows, not sentences.** Some rows bundle several phrases. Merging the two related "8-week" entries (P1-08 and P2-12) would make the total 33.
- **The checkers were AI-assisted too.** Both passes were run with an AI coding assistant. The author supplied the original brief for pass 2 and reviews the changes. The original brief is not published here, so a reader cannot re-run pass 2.
- **Verdicts are classifications.** See section 1.
- **Pass 1 and pass 2 used different evidence.** Entries are not directly comparable across passes.

## 6. Reproduce

```
node docs/ai-evals/count.mjs --json
cd tests && npm install && npm test
```
