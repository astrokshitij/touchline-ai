# Experiment design: when should guardians be notified?

**Status:** a design only. No experiment has run, and no result is claimed. The case study ranks notification timing as the **runner-up** priority behind reliable correct-child assignment.

## Why a test, not a rollout
The brief reports that opens look higher when parents are notified Sunday evening rather than Saturday afternoon (about 85% vs 70%) [Source: assessment materials, correlational, not re-verified]. A correlation like this can come from many things (which teams notify when, game types, the audience). Only a randomised test shows whether *changing the timing* changes opens.

## Order of work (an inference)
Run this **after** the attribution fixes. Wrong-child reels may depress opens [Hypothesis, not shown by data], which would contaminate any timing result.

## The design

| Item | Choice | Why |
|---|---|---|
| Hypothesis | Sending the notification on Sunday evening raises the share of guardians who open the reel within 72 hours, versus Saturday afternoon | The brief's correlation |
| Arms | A: Saturday afternoon (current). B: Sunday evening | Keep it to one change |
| Unit of randomisation | **Team**, not guardian | Parents on a team talk to each other. Randomising guardians inside a team leaks the treatment |
| Primary metric | Reel **opened** within 72 hours of the send, over **all** notified guardians | Uses the full denominator, no conditioning on prior opens |
| Secondary | Time to first open; share of opened reels shared (shown separately, never as the headline) | |
| Guardrails | Opt-outs and unsubscribes, support tickets, wrong-child reports | Must not rise |
| Eligibility | Guardians with verified consent only; reels that passed coach review | Same gates as the product |
| Duration | At least 4 full game weeks, so each arm sees several weekends | Weekly rhythm and novelty |
| Stop rules | Fixed sample size, decided before the start. Stop early only for a guardrail breach | Avoid peeking |
| Analysis | Compare open rates with a cluster-aware test (or a mixed model with a team effect). Report the difference with a 95% interval | |

## Sample size (computed)
Baseline open rate 70% (from the brief), two-sided alpha 0.05, power 80%. Script: [`sample_size.py`](sample_size.py).

| Minimum detectable lift | Guardians per arm (independent) | With design effect 1.5 (assumed clustering) |
|---|---|---|
| +2 points (70% to 72%) | 8,080 | 12,120 |
| +3 points (70% to 73%) | 3,554 | 5,331 |
| +5 points (70% to 75%) | 1,251 | 1,877 |
| +10 points (70% to 80%) | 294 | 441 |
| +15 points (70% to 85%) | 121 | 182 |

The 1.5 design effect is an **assumption**. Real clustering depends on team sizes and how similar guardians on a team are. Estimate it from past data before committing.

**Reading it.** The claimed 15-point gap would be easy to detect. A realistic effect is probably smaller, so plan for +5 points unless there is a reason not to. That is about 1,900 guardians per arm, which tells you how many teams you need.

## Risks and how they are handled
- **Weekend effects:** randomising by team means both arms experience the same weekends.
- **Novelty:** run long enough for the first-week bump to fade.
- **Ethics:** guardians already consented to notifications. Nothing deceptive is shown. No new data about children is collected.
- **Wrong-child incidents mid-test:** pause the affected club (the product's own safety guardrail) and record it.

## Decision rule (proposed, to agree before the start)
- Ship B only if the lower end of the 95% interval is above zero **and** no guardrail worsened.
- If the result is inconclusive, keep A and stop. Do not extend the test to "get significance".

## What to report
The open-rate difference with its interval, the guardrails, the number of teams, and anything that went wrong. Not just "B won".
