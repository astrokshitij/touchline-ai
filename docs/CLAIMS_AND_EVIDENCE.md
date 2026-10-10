# Claims and Evidence

Written October 2026, after the assessment closed. Purpose: keep **source facts**, **inferences**, **proposed targets** and **simulated behaviour** apart, and list what still needs the author's decision.

## Important limit of this review

The original assessment files (Decision Card, submission, materials, AI use log, independent evaluation) were **not available** when these documents were revised. Only this repo was. So:

- Items marked **Source** are numbers or events the earlier documents attributed to the assessment materials. They were **not re-verified**. Check them against the originals before you rely on them.
- Fixes were made where a claim contradicted itself, contradicted another document, or went beyond its evidence. They were **not** made by comparing against the Decision Card. Section C lists what to compare.

## A. How claims are labelled

| Label | Meaning |
|---|---|
| **Source** | Stated in the assessment materials. Not re-checked here. |
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
| "Editor would have wasted 8 engineering weeks"; "0% of the problem"; "6-inch phone" colour | 8 weeks was a proposal; the rest is invented | Now "a proposed 8-week build"; colour removed |
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
| "$180k ARR" (README) versus "seasonal contract value" (memo) | Contradiction | Both say "$180k contract". Confirm the exact term |
| "210 coaches and parents" versus "210 respondents across 40 clubs" | Inconsistent description | "210 respondents across 40 clubs" |

## C. Please check against the originals

1. The ticket details: which clubs, jersey pairs (#7/#17?), and whether any ticket recorded a confidence value.
2. About 30% unopened, 92% share rate, 90% recap clicks, 15-second recap, 24-hour versus 90-day windows.
3. Survey 58% (n = 210, 40 clubs) and editor telemetry (6% opened, under 1% finished, 90 days). Whether "all accounts" or "parent accounts".
4. The notification claim (70% versus 85% open rate, Sunday versus Saturday).
5. The Decision Card's weights and 1-5 scores. The arithmetic here is correct (4.15, 2.75, 2.25, 1.85, 1.00).
6. The **October 15, 2026** feasibility date, and the LiveKit / Agora mention.
7. "$180k" and "renewal in six weeks" wording.
8. Review latency 4.5 minutes, "under 5 minutes", 50 matches, CCDR 95%, 500 clips, 20% sample, 7-day cutoff, 30-day purge. These are all labelled **Target**. Confirm which came from your submission.
9. The AI log: "Gemini 1.5 / 3.8" looks like a typo.
10. The assessment's required form for the Decision Card, which these documents should match.

## D. Decisions that need your product judgment

1. **Confidence and review.** I removed all auto-publish and delayed-release tiers, based on your rule that high confidence never bypasses coach review. If your submission had them, tell me how to present them (for example, as a rejected option).
2. **Zero-highlight and CCDR.** The current metric counts an honest zero-highlight week as a miss in the numerator. Is that your intended definition?
3. **CCDR with sampled audits.** Keep "every record audited", or define an estimate with an interval?
4. **Phase 1 gate.** "50 clean matches and CCDR 95%" and "Wilson lower bound 95% at 500 audited clips" are two gates. Both, or one?
5. **Jersey-mismatch warning.** Should Review warn when a confirmed child's jersey differs from the frame? It would help, but could also train coaches to ignore warnings.
6. **Reassign preselect.** The modal now preselects the single roster player whose jersey matches the frame. This is generic, not hard-coded to one clip, but it is still a suggestion that could bias a coach. Keep it?
7. **Lock after publish.** The prototype now blocks review changes after publication. The real correction flow (revoke, reissue, notify) is undefined.
8. **License.** None exists. Pick one, or state "all rights reserved".

## E. Prototype fixes in this pass

- Reassign modal: Liam T. is now actually selected (before, the last matching option silently overrode it), and the note follows the selected child. A note that names a different child blocks confirm.
- Clip 11 started at 74:15 in 72:00 of footage. It is now 70:15. Cards show start and end. A clip past the footage now blocks publication.
- Removal reason has no default, so it is genuinely mandatory.
- Reel thumbnails show the jersey in the clip, not the child's own number, so a wrong-child confirm cannot look right.
- Excluded children stay visible with their reason and any withheld clips.
- Decisions lock after the simulated publish. "Idempotency key" wording replaced by "duplicate-publish guard (simulated)".
- Start Over now resets fail mode and the review tab state. Match-1 notes no longer show on match 2.
- Unchanged by design: no bulk confirm, every clip starts unresolved, approval resets on any change, one blocking batch.
