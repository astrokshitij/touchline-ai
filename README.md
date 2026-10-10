# TouchlineAI: coach-reviewed highlights for youth sports

A product case study and clickable prototype. It asks one question: **how do you stop a youth-sports app from sending one child's highlight clip to another child's parent?**

> **Read this first**
> - This is a portfolio project that started as a product-management assessment. The assessment is closed. Nobody has approved, built or shipped this.
> - The prototype uses **fictional data**. The "AI" and the "delivery" are **simulated**. It does not analyse video, recognise anyone, or send any email or SMS.
> - Numbers about the scenario (tickets, share rates, survey results) come from the assessment materials. They are not re-checked in this repo. Targets and thresholds are proposals, not results. See [`docs/CLAIMS_AND_EVIDENCE.md`](docs/CLAIMS_AND_EVIDENCE.md).

## The idea in one minute

- **Source facts (from the assessment brief):** four support tickets across three clubs reported a clip of one child in another child's reel, always with similar jersey numbers (#4/#14, #1/#11, #7/#17). About 30% of generated reels were unopened. A flagship club wanted live streaming for a $180k renewal.
- **Decision:** fix reliable correct-child assignment first. Notification timing is the runner-up. Livestreaming gets a bounded feasibility investigation before anyone commits to a build.
- **Design rule:** the coach decides on every clip. Model confidence, even 99%, never skips that step.
- **Publishing rules:** publication is blocked if any clip is unresolved, any included child lacks consent or a recipient, or any clip is unrenderable. Any change after approval requires a fresh approval. A child with no highlights gets an honest "no confirmed highlights" notice, never someone else's clips.

## Portfolio projects
Beyond the prototype, the case study is extended into separate projects in [`projects/`](projects): wireframes, two product teardowns (drafts), a reproducible data analysis, an experiment design, a pre-mortem with an AI evaluation plan, and a livestream feasibility brief. See [`projects/README.md`](projects/README.md) for status and evidence quality.

## Run the prototype

No install, no build, no network.

1. Open `site/index.html` in a browser (double-click it), or run `python3 -m http.server -d site 8000` and visit `http://localhost:8000`.
2. A narrow window or phone view (375px wide) is the intended layout. Wider windows also work.

The hosted copy at <https://sidelinereel-kshitij.netlify.app> is the build from the assessment. It may not include the fixes in this repo.

## Demo script (about 4 minutes)

| Step | Do this | You should see |
|---|---|---|
| 1 | On **Setup**, press *Run Simulated AI Moment Detection* | 11 proposed clips, every one **unresolved** |
| 2 | On **Review**, open the clip at 14:22 | The frame shows jersey **#4**, but the AI proposed **Maya S. (#14)** at 94% |
| 3 | Press *Reassign* | Liam T. (#4) is preselected and the note names Liam. Change the player and the note follows. A note naming a different child blocks confirm |
| 4 | Confirm, then try *Preview & Publish* | **Publication Blocked**: unresolved clips and Sofia H.'s missing consent |
| 5 | Press *Remove* on a clip and confirm without a reason | Refused. A reason is mandatory |
| 6 | Decide every clip, then on **Publish** use *Simulate Exclusion* (or *Simulate Consent*) for Sofia | Her exclusion stays visible with its reason. Noah B. shows an honest zero-highlight card |
| 7 | Press *Approve*, then go back and change any clip | Approval is reset and publish is locked again |
| 8 | Approve again, switch *Fail Mode* on, publish, then *Retry* | Only Lucas M. fails and is retried. The other recipients are not re-sent |
| 9 | After publishing, go back to Review | Decisions are locked. A real system would need a revoke-and-reissue flow |

Screens from the corrected build: [`docs/screenshots/`](docs/screenshots). The older images in `demo/` come from the assessment build and still show the bugs fixed since (for example `04-reassign.jpg` shows a note that contradicts the selected child).

## What is real and what is simulated

| Real in the browser | Simulated or missing |
|---|---|
| The review and publishing rules (blocking, approval reset, exclusions, zero-highlight handling) | AI detection, jersey reading and confidence scores (fixed fictional data) |
| An in-memory decision log (lost on reload) | Video: frames are drawn graphics, not footage |
| A duplicate-publish guard and retry of failed recipients only | Email/SMS: nothing is sent |
| | Backend, login, roles, saved data, server-side checks |

How each requirement maps to the prototype: [Appendix A of the PRD](specs/PRD_SPECIFICATION.md#appendix-a-what-the-prototype-covers).

## Limitations

- Checks run in your browser, so they only show the intended rules. A real system must enforce them on a server.
- No real model has been built or evaluated. No accuracy claim is made anywhere in this repo.
- Confidence thresholds are deliberately not defined. There is no calibration data.
- The prototype does not warn when a confirmed child's jersey differs from the number in the frame. Whether it should is an open product decision.
- The decision log has no durable store, and shared-jersey cases, roles and guardian views are not built.
- Consent handling is a mock. It has had no legal review.
- The scenario figures (tickets, 30% unopened, 92% share, 58% survey) are from the assessment materials and were not re-verified in this repo.
- Evaluation scores from the assessment, where mentioned elsewhere, are a reviewer's estimates, not official employer results.
- No license file has been added yet (see [`docs/REMAINING_WORK.md`](docs/REMAINING_WORK.md)).

## Tests

Browser checks in [`tests/`](tests) use Playwright and Chromium:

```bash
cd tests
npm install
npm test            # optional: SCREENSHOT_DIR=/tmp/shots npm test
```

They cover the corrected flow, the publication gates, console errors, external requests and layout at 320, 375, 768 and 1280 px. They are checks of this prototype only, not evidence about a real product.

## Repository map

```
README.md
site/index.html                  the prototype (one file, no dependencies)
specs/PRD_SPECIFICATION.md       requirements FR-1 to FR-24, rules, prototype coverage
specs/TRADE_OFF_ANALYSIS.md      prioritisation memo
analytics/METRICS_DECONSTRUCTION.md   the share-rate and editor numbers, and the CCDR metric
logs/AGENTIC_WORKFLOW.md         how AI tools were used and checked
docs/CLAIMS_AND_EVIDENCE.md      what is fact, inference, target or simulated; open decisions
docs/REMAINING_WORK.md           what is left to do
docs/screenshots/                screens from the corrected build
projects/                        wireframes, teardowns, data analysis, experiment, pre-mortem, feasibility brief
tests/                           browser checks
demo/                            assessment-era screenshots and a silent screen recording
```

## Video

`demo/prototype_walkthrough.mp4` is a silent screen recording (1080p, about 3 minutes) of the assessment build. The narrated video was uploaded with the original submission. Its public link is currently unavailable.

## Author

Kshitij Pandey, [@astrokshitij](https://github.com/astrokshitij)
