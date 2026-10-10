# The evaluation rubric used to plan the original assessment

A paraphrase, anonymised like `docs/PROBLEM_STATEMENT.md`. The author wrote the rubric to score every output, whether AI-drafted or the author's own, against the assessment's five stated criteria. This copy was supplied by the author on 10 October 2026.

> **What this shows and what it does not.** It shows that checking was designed before the work, with pass/fail gates and a shared checklist. The scores from the original run are **not in this repository**, except for the one B2 result noted at the end. Whether each layer was run as written is the author's account, not something the repo can confirm.

## How scoring worked
- Each criterion is scored 1 to 5. A 5 is specific, evidenced and has no gaps. A 3 is acceptable but generic or partly evidenced. A 1 is missing or wrong.
- Some criteria are **gates**. Any gate below 3 means the output is redone.
- Verdict: any gate below 3 is REDO. Any criterion below 4 is FIX. Otherwise SHIP.
- Every verdict names the single cheapest fix and its time cost, because under the 120-minute cap a shipped 4 beats an unfinished 5.
- A standard output block records the scores, gate result, weakest point, fix, fix cost and verdict.

## Layer A: ingest check, after each source was read
| Criterion | Gate | What a top score needs |
|---|---|---|
| Extraction completeness | Yes | Every number, quote and request in the source is in the ledger; three random lines spot-checked |
| No fabrication | Yes | No number or claim that is not in the source; inferences labelled |
| Signal typing | No | Each row tagged behavioural, stated, anecdotal or commercial, with a reliability grade and reason |
| Conflict detection | No | Contradictions with earlier sources named |
| Metric trap detection | No | Any denominator, window, segment or definition problem flagged |

## Layer B: rubrics per task
- **Prioritisation:** coverage of every source (gate), evidence over volume (gate), stated versus revealed behaviour, metric scepticism, fit with the core job, explicit trade-offs and a "not now" list, a clear decision.
- **Spec:** an engineer could build v1 without a blocking question (gate), problem and evidence, scope, numbered atomic requirements, given/when/then acceptance criteria (gate), AI behaviour (inputs, outputs, confidence and what happens below it, fallback, human correction, how quality is measured), trust and privacy for minors' footage, data and states, one primary metric with guardrails, rollout with kill criteria, open questions with owners.
- **Prototype:** runs with no console errors (gate), core flow works end to end (gate), fidelity to the numbered requirements, honest simulated AI that can be wrong and has a correction path, at least one non-happy state, scope discipline, clarity in 30 seconds.
- **AI-use note:** names where AI was used per task (gate), what stayed human, one concrete checked-or-rejected example (gate), a repeatable practice.
- **Pushback response:** holds or moves for a reason (gate), adds new reasoning and does not restate (gate), acknowledges the valid part, offers a path, says what evidence would change the decision, calm tone.
- **Video and full document:** accessible link and one consistent set of numbers across ranking, spec, prototype and video (gates), skimmable sections, links tested.

## Layer C: slop checklist, run on any AI output before keeping it
A line fails if it has:
- a number not traceable to a source tag
- a quote not in the materials
- generic product-management boilerplate that would fit any product
- hedging with no decision
- numbers that differ between sections
- features or users that do not exist in the materials
- length that adds no decision value
- an em dash

Each hit is logged in the AI-use log as checked or rejected. Those entries are the raw material for the AI-use note.

## Who judged (as the rubric assigns it; see the note below on what happened)
- Chat self-checks with a quick scoring footer. Same model family, so not independent.
- A second-model judge gives the independent verdict at three checkpoints: the ranking, the spec, and the final document with the prototype source.
- The author ran the prototype click test personally.

In the run, per the author's AI-use log, the second-model judge became unavailable and a separate reviewer from the drafting model family took over. The log calls that "a second review, not an independent model family". One recorded result: a spec (B2) checkpoint with every criterion at 4 or 5, gates passed, verdict SHIP.

## Applied again in October 2026
Layer C was run over the text added for the case-study "AI evals" section. Result: no em dashes, no stock boilerplate phrases, and every count on the page matches `claims-ledger.csv` (enforced by the browser tests). This is a check of the new text only.
