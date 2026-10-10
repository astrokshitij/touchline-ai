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
| **Unsupported** (no source 12 + overstated 7 + contradicted 2) | **21** |
| Inconsistent inside the repo | 4 |
| Not checkable against the brief (author-sourced, labelled) | 1 |

Of the 14 entries checked against the original brief (pass 2): 8 supported, 5 unsupported (4 with no source, 1 contradicted), 1 not checkable.

**Where the problems came from.** Of the 25 problem entries (everything that is not supported and not "not checkable"), 24 are already present in the first commit `15becab`. One (P1-14) could not be pinned to a commit. The git author of `15becab` is the author's own account, so **git cannot show which AI tool drafted the text**. That attribution rests on the author's statement and on `logs/AGENTIC_WORKFLOW.md`.

**What pass 1 missed.** Pass 1 had no brief. It found 20 internal problems, but it listed the ticket numbers, the notification figures and the recap details as items to "check against the originals" and left them in place labelled as source. Pass 2 showed that five such entries (P2-09 to P2-13) had no source or were wrong. Pass 1 also softened an invented effort figure to "a proposed 8-week build" (P1-08); pass 2 removed it. So a review that does not hold the source cannot catch invented facts, and a fix can carry the same fault.

## 3. Pass 3 (this change, 9 entries, counted separately)

Done while building the page:

- Recomputed five statistics used on the case-study page with a short script (Wilson lower bound and pass probabilities, the 64% product, the 5.6-point gap). All five matched (P3-02 to P3-06).
- Found three wrong or stale statements and fixed them: the case-study page said "80 automated browser checks" when the suite had 92 (P3-01, wrong when written); the README top note and the label table in the claims document still said the scenario figures were "not re-checked" after pass 2 had checked them (P3-08, P3-09, true when written, stale since).
- One item stays open (P3-07): `docs/PROBLEM_STATEMENT.md` says "210 parents" while other files say "210 respondents". This needs the original brief. The new section avoids the word.

Not recomputed: the experiment's "about 1,900 guardians per arm" (it rests on an assumed design effect) and the other figures in `projects/04`.

## 4. Earlier outputs rejected at assessment time (self-reported, not counted above)

`logs/AGENTIC_WORKFLOW.md` records five AI outputs rejected during the assessment itself. They are kept apart because the original session is not in this repo, so git cannot corroborate them, and the log was not re-checked against the original AI-use log.

| Output | Kind | What was found | What was done |
|---|---|---|---|
| A fabric-fold / OCR segmentation cause for the wrong-child errors | Unsupported claim | The tickets give no cause | Deleted; problem framed as observed number confusion |
| "30% unopened reels" restated as "30% of users get no value" | Overstated claim | Telemetry counts reels, not users | Rejected; reel open rate kept apart from user retention |
| A "Quick Confirm All Uncontested" bulk button | Behaviour that weakens the safety rule | Would let a coach skip looking at each clip | Removed; every clip starts unresolved |
| A "100% Zero Wrong Child Delivered" success banner | Overstated claim | A coach's confirm does not establish accuracy | Replaced with a simulated-dispatch notice |
| Partial publish that silently left out children without consent | Behaviour that weakens the safety rule | Hides an exclusion from the coach | Replaced with an atomic batch hold |

Three of these are now guarded by tests in `tests/e2e.mjs`: no bulk or confirm-all control exists, the publish message carries no "100%" or "zero wrong child" boast, and an excluded child stays visible with a reason.

## 5. Limits of these numbers

- **Not an error rate.** The ledger holds the claims that were flagged or chosen for checking. It is not a random sample of everything in the repo. 21 of 34 must not be read as "62% of AI claims are wrong".
- **Rows, not sentences.** Some rows bundle several phrases. Merging the two related "8-week" entries (P1-08 and P2-12) would make the total 33.
- **The checkers were AI-assisted too.** Both passes were run with an AI coding assistant. The author supplied the original brief for pass 2 and reviews the changes. The original brief is not published here, so a reader cannot re-run pass 2.
- **Verdicts are classifications.** See section 1.
- **Pass 1 and pass 2 used different evidence.** Entries are not directly comparable across passes.

## 6. Reproduce

```
node docs/ai-evals/count.mjs --json
cd tests && npm install && npm test
```
