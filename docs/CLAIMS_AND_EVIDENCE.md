# Claims and Evidence

Written October 2026, after the assessment closed. Purpose: keep **source facts**, **inferences**, **proposed targets** and **simulated behaviour** apart, and list what still needs the author's decision.

## Status of this review

**Update, 10 October 2026:** the author supplied the original problem statement (the five assessment materials). Every **Source** claim in this repo was then checked against it. Section C records the result, including **claims I had gotten wrong or invented** and have now corrected.

Later on 10 October the author's AI-use log was read and is used in `docs/AI_EVALS.md`. The prioritisation weights and 1-5 scores were checked against the submission table and match. The Decision Card itself and the October 15 date are still not compared. Anything that came from those (the October 15 date, the 1-5 prioritisation scores, the targets) is labelled as the author's judgment or a proposal, not as a fact from the brief.

## A. How claims are labelled

| Label | Meaning |
|---|---|
| **Source** | Stated in the assessment materials. Checked against the original brief on 10 October 2026 (section C). |
| **Inference** | Reasoning from source facts. May be wrong. |
| **Assumption** | Needed for a calculation. Stated next to it. |
| **Target** | A proposed number or policy. No validation behind it. |
| **Judgment** | The author's score or recommendation. |
| **Simulated** | Behaviour of the prototype with fictional data. |

## B. What changed and why

| Earlier claim | Problem | Now |
|---|---|---|
| PRD "Approved for Implementation (B2 SHIP Gate Passed)"; memo "Approved by Product Leadership" | An approval nobody gave | Both marked as case-study drafts with no approval |
| "Jersey #4 as #14 at 94% confidence" presented as a ticket fact | The tickets give no confidence value (as far as the repo shows); 94% is the prototype's scenario | Labelled **Simulated**. Check whether the real ticket gave a confidence |
| Causes: "stroke morphology", "perspective warp", "OCR segmentation", fabric folds | No source gives a cause. The AI log itself rejects such claims | Removed. The spec says the cause is unknown |
| "Misattribution is a structural CV limitation" | Unsupported | Reworded to "recurs at three clubs; cause unknown" |
| "Wrong-child thumbnails are a major churn driver"; "directly drives the 30% non-opening" | Contradicts the AI log (cause not established) | Now a **Hypothesis**. Attribution is prioritised because it is a trust and safeguarding failure on its own |
| "Unlocking the remaining 35.6% of reach"; "over 35% of reels fail to deliver value" | 35.6% includes about 6% opened-but-unshared reels. Unshared is not value failure | Replaced with the 30% / ~6% split |
| 64.4% stated as exact | Needs "exactly 30% unopened" and "unopened is never shared" | Shown as about 64% with both assumptions |
| "Editor would have wasted 8 engineering weeks"; "0% of the problem"; "6-inch phone" colour | The brief gives no effort estimate for an editor | Removed |
| Parents "stated editing to fix bad clips"; "cognitive load was prohibitive" | Untested explanation stated as fact | Marked **Hypothesis**. Added a caveat that survey and telemetry cover different groups |
| AWS G5, multi-CDN, WebRTC, "multimillion-dollar" streaming | Invented engineering and cost estimates | Removed. No estimate exists; the feasibility study would produce one |
| "Public broadcast of unconsented minors" | Assumes a design nobody specified | Reworded as risk if consent and access are not designed first |
| COPPA/GDPR-K "enforced" or "violations" | Legal claims with no review | Now "may apply; no legal review" |
| Phase 3 auto-publish at confidence 0.90; "held / delayed release" at 0.80-0.90; "auto-validated candidate" | Conflicts with "high confidence never bypasses coach review". Thresholds had no data | Removed. Confidence only orders and flags the queue. See decision 1 below |
| Phase 1 "audit 100%" versus "10% sample" in Failure Mode 1 | Internal contradiction | Failure Mode 1 now points to the phase plan |
| CCDR needs every record audited, but later phases audit samples | Metric cannot be computed as written | Noted as an open estimator decision |
| Maya "L." in PRD and README, "S." in prototype | Name mismatch | Now "Maya S." everywhere |
| README "immutable audit trail", "idempotency key", "production PRD", MIT badge | Prototype keeps a log in memory, has no key, no license file exists | Reworded. Badge removed |
| README cites `scratch/test_e2e.js` and "12/12 passed" | File is not in the repo | New suite in `tests/` that you can run |
| "$180k ARR" (README) versus "seasonal contract value" (memo) | The brief says "$180k a season" | Both now say a $180k-a-season contract |
| "210 coaches and parents" versus "210 respondents across 40 clubs" | Inconsistent description | "210 respondents across 40 clubs" |

## C. Checked against the assessment brief (10 October 2026)

| Claim in this repo | Result against the brief |
|---|---|
| 210 respondents, 40 clubs; editing controls were the top requested improvement; 58% named it their single biggest ask | **Verified** |
| 6% of parents opened the Reel Editor; fewer than 1% of those finished an edit; last 90 days, all accounts | **Verified** |
| 92% reel share rate, calculated only over opened reels; about 30% of reels never opened | **Verified** |
| The 90% figure is the Share button on the weekly auto-recap, over 90 days | **Verified**. It is a different artifact and event from the 92% |
| Analytics note names two suspected causes for unopened reels: late-night notifications and a wrong-kid thumbnail ("support tickets suggest") | **Verified, and it is a hypothesis.** Notification timing is therefore a real candidate, not an invention |
| Wrong-child reports: a #14 child shown a #4 child's clip; a coach saw it twice with "swapped digits"; a #1 child shown a #11 clip | **Verified.** Three tickets, four incidents, three clubs. Two other tickets (app icon, watermark) are unrelated |
| $180k a season; renewal and signups in six weeks; the biggest club account | **Verified** |
| The livestream request is for every game, for grandparents **and college scouts** | **Verified, and I had left scouts out.** Scouts are not guardians, so the consent question is bigger. Now in `projects/07` and the memo |
| **"#7 vs #17"** | **Not in the brief. Invented. Removed everywhere**, including the public case-study page |
| **Notification timing: "70% vs 85%, Sunday evening vs Saturday afternoon"** | **Not in the brief. Invented. Removed.** Replaced by the analytics note's late-night hypothesis |
| **Auto-recap "15-second", "24-hour window", "stakeholders conflated", "auditing revealed"** | **Not in the brief. Invented. Removed** and rewritten as a plain comparison of two numbers |
| **A survey question "What features would improve your experience...", and an "8-week editor initiative", and a tracked event name** | **Not in the brief. Invented. Removed** |
| Clubs named "Brightwater SC" and "Cobblestone FC" | Wrong: the brief says lacrosse and little league. Fixed |
| Oct 15, 2026 feasibility date; prioritisation weights and 1-5 scores; 4.5-minute review, 50 matches, 95% CCDR, 7-day cutoff, 30-day purge | **Not in the brief.** These come from the author's own submission or are proposals, and are labelled so |
| Confidence values such as 94%; thumbnails; any technical cause for the errors | **Not in the brief.** The 94% is the prototype's simulation. No cause is stated anywhere |

**What this means.** My earlier documents said some of these were "from the assessment materials" when they were not. That was my error. The core story (misattribution first, notification timing second, livestream bounded, editor deprioritised) is supported by the brief. The corrections above remove numbers and details it does not support.

Still open for the author: confirm the Decision Card scores and the October 15 date match your own submission.

## D. Product decisions taken (October 2026)

You asked me to decide as the PM. These are my decisions, with reasons. Each is reversible by editing the files named. **They are recommendations I made on your behalf, so read them before you rely on them.**

| # | Question | Decision | Why | Applied in |
|---|---|---|---|---|
| 1 | Can high confidence ever skip coach review? | **No, at any phase.** Confidence only orders and flags the queue. | Matches your rule. A confident model can still be wrong, and the cost of a wrong-child delivery is a trust and safeguarding failure. | PRD sections 3, 8, 14 |
| 2 | Does an honest zero-highlight week count as a CCDR success? | **A verified true-zero week is a success. A missed moment is a miss.** CCDR is always reported beside **Highlight Coverage**. | Counting honest zero as a miss lowered CCDR by about 10 points in the synthetic cohort and pushes toward padding reels. The coverage companion stops CCDR being gamed by withholding. | Metrics doc, PRD section 13, `projects/04` |
| 3 | CCDR when audits are sampled | **Phase 1 audits every batch (exact). Later phases report an estimate with a Wilson 95% interval from a stratified sample. Unaudited records never count as success.** | Keeps the metric honest as audit coverage drops. | PRD section 13 |
| 4 | Phase 1 gate | **All must hold: at least 50 clean matches, Wilson 95% lower bound of at least 0.95 on at least 1,000 audited clips, no unresolved wrong-child incident.** | At 500 clips a truly 97%-accurate system passes only about 57% of the time. At 1,000 it passes about 88%, a fairer test. | PRD section 14, `projects/04` |
| 5 | Jersey-mismatch warning | **Ship it, as a non-blocking hint.** It appears when the number seen in the frame differs from the assigned child, or when the number is unreadable. It never confirms, rejects or skips a clip. **Validate in the usability test** with and without it. | Cheap, directly targets the 14-vs-4 failure. Risk is warning fatigue, which the test measures. | Prototype, 8 new tests, wireframe C4 |
| 6 | Reassign preselects the player whose jersey matches the frame | **Keep**, labelled "Preselected because jersey #N matches. Verify visually." | Speeds the common case. Same warning-fatigue risk, same test. | Prototype, wireframe C5 |
| 7 | Review after publish | **Locked.** A real correction flow (revoke, reissue, notify, audit) is on the roadmap, not designed. | The delivered manifest must not drift from what was sent. | Prototype, wireframe C12, remaining work |
| 8 | License | **All rights reserved for now** (see `LICENSE`). | This is a portfolio. Visibility matters more than reuse, and you can loosen to MIT later. You cannot take a permissive license back once others copy the repo. | `LICENSE`, README |
| 9 | Teardowns | **Publish as clearly labelled drafts**, not as finished work. | They rest on search summaries. Presenting them as hands-on would be misleading. | `projects/02`, `projects/03` |
| 10 | The October 15 feasibility date | **Keep.** | It is the memo's proposed commitment. The five-day plan fits. | `projects/07` |

Still needing **you**: check the source facts in section C against your original files, and do the teardown hands-on lists.

## F. Limits of the portfolio projects (added later)

- **Teardowns (`projects/02`, `projects/03`):** built from search-result summaries of public pages. The primary pages could not be opened (network policy), and nothing was tested hands-on. Every claim carries a link and a label, and each file has a verification checklist. **Re-check before publishing.**
- **Data analysis (`projects/04`):** source numbers are as stated in the brief and were checked against it on 10 October 2026. Sections 5 and 6 are synthetic or use invented rates, and say so.
- **Experiment (`projects/05`):** the 70% baseline is from the brief. The 1.5 design effect is an assumption.
- **Wireframes (`projects/01`):** the Figma file is partly built because the Figma tool-call allowance ran out. Guardian and QA screens are spec-based and carry **proposals** (magenta) that need a product decision.
- **Pre-mortem (`projects/06`):** likelihood and impact ratings are the author's judgment.
- **Livestream brief (`projects/07`):** contains no estimates, costs or vendor claims.

## E. Prototype fixes in this pass

- Reassign modal: Liam T. is now actually selected (before, the last matching option silently overrode it), and the note follows the selected child. A note that names a different child blocks confirm.
- Clip 11 started at 74:15 in 72:00 of footage. It is now 70:15. Cards show start and end. A clip past the footage now blocks publication.
- Removal reason has no default, so it is genuinely mandatory.
- Reel thumbnails show the jersey in the clip, not the child's own number, so a wrong-child confirm cannot look right.
- Excluded children stay visible with their reason and any withheld clips.
- Decisions lock after the simulated publish. "Idempotency key" wording replaced by "duplicate-publish guard (simulated)".
- Start Over now resets fail mode and the review tab state. Match-1 notes no longer show on match 2.
- Unchanged by design: no bulk confirm, every clip starts unresolved, approval resets on any change, one blocking batch.
