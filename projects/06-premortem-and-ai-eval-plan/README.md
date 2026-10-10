# Pre-mortem and AI evaluation plan

Two linked documents: a **pre-mortem** (imagine the pilot failed, work backwards) and an **AI evaluation plan** (what to measure before any model is trusted).

> No model exists in this project, and no accuracy claim is made. Ratings below are the author's judgment, not data.

---

## Part 1. Pre-mortem

**Scenario:** it is six months after the pilot started. It failed. Why?

| # | Failure story | Early warning | Mitigation (already designed, or proposed) | Likelihood / impact (author's judgment) |
|---|---|---|---|---|
| 1 | A tired coach confirms a confident wrong proposal and a child's clip reaches another family | Rising share of clips confirmed in under a few seconds; QA finds a wrong-child delivery | No bulk confirm. Evidence beside the decision. Proposed mismatch warning (C4). 100% QA audit in Phase 1. Reel revocation | Medium / Very high |
| 2 | Coaches stop reviewing because it takes too long | Draft abandonment, reviews done days late | Measure median and p95 review time. Fast one-clip mode (each clip still decided). Reminders | High / High |
| 3 | Consent data is wrong or stale, so a child is sent footage a guardian did not agree to | Consent records without a verification date; opt-out requests after delivery | Hard consent gate, atomic batch hold, exclusion path, opt-out and deletion. **Needs legal review** | Medium / Very high |
| 4 | Two players share a number and the system mixes them | Reassignments concentrated on a few number pairs | Roster-confirmed numbers. Side-by-side candidates for shared numbers (specified, not built) | Medium / High |
| 5 | The model is worse in conditions nobody tested (low light, distance, a new camera) | Coach-correction rate varies sharply by venue or camera | Slice-based evaluation (Part 2). Log conditions per clip | High / Medium |
| 6 | Guardians do not open reels at all, so nothing is learned about quality | Open rate stays low whatever we fix | Notification-timing experiment (project 05). Do not assume wrong-child clips are the cause | Medium / Medium |
| 7 | A wrong-child report arrives and there is no agreed response | Reports sit unanswered | Written incident process. Hide the reel first, investigate second. Pause the club | Medium / High |
| 8 | The metric (CCDR) is gamed or misleading, for example zero-highlight weeks counted as failures | Teams "fixed" by adding weak clips | Decide the zero-highlight rule (project 04, finding 6). Never pad reels | Medium / Medium |
| 9 | The livestream request returns with no decision made | The club's renewal conversation stalls | Bounded feasibility brief (project 07) with a dated decision | Medium / High |
| 10 | The audit sample is too small to tell a good system from a bad one | Gate passes or fails seemingly at random | Pick n from the power analysis (project 04, finding 5) | Medium / Medium |

**Biggest risks to settle first:** #1 and #3. Both are about children, and both need a person to stay in the loop.

---

## Part 2. AI evaluation plan

**Principle:** measure before trusting. No confidence threshold, accuracy target or auto-approval is set here, because there is no data to set one from. Coach review stays on every clip.

### What to evaluate
| Task | Question | Why separate |
|---|---|---|
| Moment detection | Does it find the plays worth clipping? | Misses (recall) are invisible to a coach who only reviews what is shown |
| Person detection and tracking | Is the right player followed through the clip? | Tracking errors turn into identity errors |
| Jersey number reading | Is the number read correctly, and when is it unreadable? | Source tickets involve number pairs such as 4/14, 1/11, 7/17 |
| Identity assignment | Is the clip assigned to the right rostered child, including shared numbers? | This is the product's actual promise |

### Dataset
- Footage from pilot clubs **with guardian consent**, stored under a documented retention rule.
- **Stratify** by camera height and distance, lighting, weather, jersey colour, and the **similar-number pairs** named in the tickets.
- Hold out whole matches (and later whole venues), not random clips, so tests reflect new conditions.
- Label with **two independent labellers** and an adjudicator for disagreements. Record the agreement rate.

### Metrics
- Per task, per slice: precision, recall, and a **confusion matrix of number pairs**.
- **Calibration:** do "90% confident" proposals turn out right about 90% of the time? Reliability diagram and expected calibration error.
- Report every rate with a **Wilson 95% interval**. Never a bare percentage.
- Product-side: coach **correction rate**, **time to review**, and reasons given on removal.

### Error taxonomy (to find the causes the source does not state)
For every wrong proposal, log: number unreadable / wrong digit / wrong child with a readable number / tracking lost / shared number / other. Review monthly. **Do not assume a cause until the taxonomy shows one.**

### Acceptance (to be decided from data, not now)
Before any change that reduces human review, the evidence needed is: slice-level results with intervals, calibration that holds on held-out venues, and an independent audit. Whether such a change is ever acceptable is an open product decision. This plan does not assume it.

### Monitoring after launch
Track correction rate by venue and camera, drift in confidence distributions, and QA-audit results. Alert on a rise in wrong-child findings. A single confirmed wrong-child incident pauses that club (PRD guardrail).

### Data governance
Children's footage: consent per guardian, role-based access, deletion on request, no external model training on footage without separate consent. **Needs legal review.**

### Evaluation card template
| Field | Value |
|---|---|
| Model and version | |
| Task | |
| Data (source, dates, consent basis) | |
| Slices reported | |
| Metrics with 95% intervals | |
| Calibration | |
| Known failure modes | |
| Intended use and not-intended use | Coach-reviewed proposals only |
| Reviewer and date | |
