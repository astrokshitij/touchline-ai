# The problem this case study answers

*A paraphrased, anonymised summary of the original product-management assessment, written for a portfolio. Names are changed. It is not a copy of the assessment text. Facts were checked against the original brief on 10 October 2026 (see `docs/CLAIMS_AND_EVIDENCE.md`).*

## The scenario
A software company sells a **youth-sports highlights app** to clubs and leagues, paid per season. Coaches upload full-game footage, or a sideline camera records it. The app finds each child's highlight moments (goals, saves, big plays), cuts a **personal reel** per child, and sends a **weekly team recap** to every family. Parents watch and share. In this portfolio the product is called **TouchlineAI**.

The role is the Product Manager. You decide **what gets built next, why, and what the spec asks the team to build**. You do not write production code or decide visual design.

## The evidence, in five inputs

| Input | What it says (paraphrased) | Why it is tricky |
|---|---|---|
| **A loud customer** | The biggest club's executive director wants **every game live-streamed** so **grandparents and college scouts** can watch in real time. Renewal and signups open in six weeks. | Urgent and emotional, but it asks for a different kind of product. Scouts are not guardians. |
| **A research summary** | In a survey of 210 parents across 40 clubs, **more editing controls** was the top requested improvement (58% named it their single biggest ask). In usage data, **6%** of parents opened the editor and **under 1%** of those finished an edit. The recap Share button is used in **90%** of recaps sent. | What people say they want versus what they do. A different artifact's 90% sits next to a different 92%. |
| **A support log** | Three tickets describe a **different child's clip in a child's reel**, always with **similar jersey numbers** (a #14 child shown a #4 child; "swapped digits"; a #1 child shown a #11). Two more tickets are cosmetic: the app icon, and a missing watermark sometimes ("not urgent"). | Real signal mixed with noise. No cause is given. |
| **A sales thread** | The VP of Sales: about **$180k a season**, the biggest club. "Is there any version we can commit to before signups open?" Sales Ops: the answer must be "concrete, not 'we hear you'." | Commercial pressure to promise something. |
| **A health dashboard** | **Reel Share Rate 92%**, but only over reels a parent **opened**. About **30%** of reels are never opened. The analytics note says most sit unopened because the **notification arrives late at night** or the **thumbnail shows the wrong kid**. | A flattering metric with a hidden denominator. The causes are suggestions, not measurements. |

## The four tasks
1. **The roadmap call:** rank the candidates with evidence, name something you would **not** build next, and decide what to do about livestreaming.
2. **The spec** for the top item: the outcome, what is in and out of scope, where a human stays in the loop, testable acceptance criteria, the **top two ways it could fail**, and what would catch each.
3. **A working prototype** of the core flow.
4. **An AI workflow note:** what AI was used for, what stayed human, and one thing an AI tool got wrong.

The original was time-boxed to 120 minutes. This repository is the **extended, post-assessment** version of the same work.

## What this repo concluded

| Question | Answer | Where |
|---|---|---|
| What first? | **Reliable correct-child assignment**, with a coach confirming every clip | `specs/PRD_SPECIFICATION.md` |
| Runner-up? | **Notification timing** (the late-night hypothesis, untested) | `projects/05-experiment-notification-timing` |
| Livestreaming for the biggest club? | A **bounded feasibility investigation** before any build commitment, because it is a different product, scouts are third parties, and consent has to be designed first | `projects/07-livestream-feasibility-brief` |
| Not building? | The **parent video editor**: stated demand did not show up in behaviour. Also the cosmetic tickets | `specs/TRADE_OFF_ANALYSIS.md` |
| The misleading metric? | 92% is about 64% of all reels, under a stated assumption | `projects/04-data-analysis-metrics-audit` |
| Prototype? | Clickable, with the review and publish rules enforced and an automated browser test suite | `site/` and the live case study |
| AI workflow note? | What AI drafted, what stayed human, and the claims rejected | `logs/AGENTIC_WORKFLOW.md` |

## What the brief does not say
These are easy to assume and are **not** in the materials. This repo treats them as unknown, simulated or proposed:
- Any **technical cause** of the wrong-child errors.
- Any **model confidence value** (the 94% in the prototype is simulated).
- Any **data on when notifications are sent** or when parents open them.
- Any **effort estimate** for an editor or for livestreaming.
- The **prioritisation scores**, review-time targets and rollout gates. Those are the author's judgment or proposals.
