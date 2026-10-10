# TouchlineAI — Metrics Deconstruction & Mathematical Rigor
## The Denominator Audit: Exposing Vanity Metrics, Funnel Fallacies & True Delivery Rates

- **Author:** Kshitij Pandey ([@astrokshitij](https://github.com/astrokshitij))
- **Status:** Analytics case-study note. Formulas are the author's. Input numbers come from the assessment materials [Source] and were not re-checked here. Targets are proposals [Target].
- **Domain:** Telemetry Auditing, Retention Mathematics, Computer Vision Evaluation

---

## 1. Executive Summary

In high-growth AI startups, product analytics often mask critical quality failures behind **conditioned denominators**—vanity metrics computed only on successful user subsets. 

This paper provides a rigorous mathematical deconstruction of two prominent metrics in the TouchlineAI ecosystem:
1. **The 92% Share Rate Trap:** Why an apparent 92% sharing rate becomes about **64%** across all generated reels, under a stated assumption.
2. **The Editor Adoption Fallacy:** How a 58% survey demand collapsed into a **<0.06% full-funnel completion rate** in real production telemetry.
3. **The North Star Metric:** The formal mathematical formulation of **Correct-Child Delivery Rate (CCDR)** as the true measure of end-to-end product value.

---

## 2. Deconstructing the 92% Share Rate Vanity Trap

### The Surface Metric
Internal marketing presentations highlighted that TouchlineAI reels enjoyed a **92% parent share rate**, presenting the product as an ultra-viral sports platform.

### The Denominator Flaw
Upon inspecting the event tracking schema, the metric was instrumented as:

$$S_{\text{reported}} = \frac{|\{r \in R \mid \text{Shared}(r) \land \text{Opened}(r)\}|}{|\{r \in R \mid \text{Opened}(r)\}|} = 0.92$$

Where $R$ represents the universe of generated video highlight reels.

However, telemetry logged in the production warehouse revealed that **roughly 30% of all generated reels were never opened by parents**:

$$P(\text{Opened}) = 1.0 - 0.30 = 0.70$$

### The Mathematical Correction
To compute the **Effective Population Share Rate** ($S_{\text{effective}}$) across all generated reels ($D_{\text{generated}}$), assuming non-opened reels cannot trigger qualified in-app share events:

$$S_{\text{effective}} = \frac{\sum_{r \in R} \mathbb{I}(\text{Shared}(r))}{|R|}$$

Expressing this via conditional probability:

$$S_{\text{effective}} = P(\text{Shared} \mid \text{Opened}) \cdot P(\text{Opened}) + P(\text{Shared} \mid \neg\text{Opened}) \cdot P(\neg\text{Opened})$$

Under the assumption [Assumption] that $P(\text{Shared} \mid \neg\text{Opened}) = 0$ and that the unopened share is exactly 30% (the source says "roughly 30%", so treat the result as about 64%):

$$S_{\text{effective}} = 0.92 \times 0.70 = \mathbf{0.644 \quad (64.4\%)}$$

```
                DENOMINATOR AUDIT: 92% VS. 64.4%
┌─────────────────────────────────────────────────────────────────────────────┐
│ ALL GENERATED REELS (100% Denominator)                                      │
├──────────────────────────────────────────┬──────────────────────────────────┤
│ 70% Opened by Parents                    │ 30% Unopened (Churn / Inactive)  │
├──────────────────────────────┬───────────┴──────────────────────────────────┤
│ 64.4% Shared                 │ 5.6% Not Shared                              │
│ (0.92 * 0.70)                │                                              │
└──────────────────────────────┴──────────────────────────────────────────────┘
```

### The Auto-Recap Metric Conflation
The dashboard also reported a **90% auto-recap Share-button click rate**. Stakeholders erroneously conflated this with the 92% highlight reel share rate. 

Auditing the underlying tracking revealed:
- **Different Artifact:** Auto-recap is a 15-second team-wide aggregate score reel, whereas personal reels are individual player clips.
- **Different Event:** The 90% metric recorded a single button click, not a completed external social broadcast.
- **Different Window:** Recaps were measured on a 24-hour window; personal reels were measured on a 90-day cohort.

**Product Consequence:** The 92% figure overstated reach. About 64% of generated reels were opened and shared. The remaining ~36% split into roughly 30% never opened and roughly 6% opened but not shared. Not being shared is not the same as failing to deliver value, and this data does not show why reels went unopened.

---

## 3. The Editor Funnel Fallacy: Stated vs. Revealed Preference

### The Survey Anomaly (Stated Preference)
A quarterly customer survey across 40 youth sports clubs (n = 210 respondents) asked:
> *"What features would improve your experience with highlight videos?"*
> **Result: 58% requested in-app editing and trimming tools.**

Based on this, product teams proposed an 8-week initiative to build a desktop-class timeline editor.

### Telemetry Audit (Revealed Preference)
Usage data across active parent accounts over 90 days establishes clear revealed preference:

| Funnel Stage | Metric / Event | Telemetry Bound |
|---|---|---|
| **Editor Opening** | Opened the video editor (`editor_session_started`) | **6%** |
| **Editor Completion** | Finished / exported edit among openers | **< 1%** |
| **Full Funnel Completion** | Finished edit across all accounts ($0.06 \times <0.01$) | **< 0.06%** |

Usage data shows 6% opened the editor and <1% of those finished, placing the funnel completion bound below 0.06%.

$$\text{Funnel Completion} = P(\text{Open}) \times P(\text{Finish} \mid \text{Open}) \le 0.06 \times 0.01 < 0.0006 \quad (< 0.06\%)$$

### Possible Explanation [Hypothesis, not tested]
People may have asked for editing hoping to fix reels with bad clips (for example the wrong child). Editing on a phone may also be too much effort. Neither idea is tested by this data.

**Caveat:** The survey (210 respondents, 40 clubs) and the telemetry (account activity over 90 days) cover different groups and times, so comparing 58% with 6% is suggestive, not like-for-like. Still, the low completion rate argues against building an editor first.

---

## 4. Formal Definition of the North Star Metric: CCDR

To align engineering, product, and club partners around real user value, we discarded vanity share rates and instituted the **Correct-Child Delivery Rate (CCDR)**.

### Mathematical Formulation

Let $C_w$ denote the cohort of eligible child-team-week records generated during game week $w$ (running Monday 00:00:00 to Sunday 23:59:59 in the club's frozen local timezone).

$$\text{CCDR}_w = \frac{\sum_{i \in C_w} Y_i}{|C_w|}$$

Where the binary success indicator $Y_i \in \{0, 1\}$ is defined as:

$$Y_i = \prod_{g \in G_i} \left[ \mathbb{I}(\text{Delivered}_{i,g}) \land \mathbb{I}(\text{Audited}_{i,g}) \land \neg \mathbb{I}(\text{WrongChild}_{i,g}) \right] \times \mathbb{I}\left( \sum_{g \in G_i} \text{Clips}_{i,g} > 0 \right)$$

Where:
- $G_i$ is the set of required games played by child $i$ during game week $w$.
- $\text{Delivered}_{i,g}$: Authorized delivery receipt confirmed before the 7-day cutoff.
- $\text{Audited}_{i,g}$: Manifest independently inspected by QA.
- $\text{WrongChild}_{i,g}$: Binary indicator of any misattributed clip in the delivered reel.
- $\sum_{g \in G_i} \text{Clips}_{i,g} > 0$: Strict requirement of at least one nonempty correctly attributed highlight reel across the game week.

> **Design choice, open for product decision:** whether an honest zero-highlight week should count as a success or a miss. The text below records the current choice.
>
> **Alignment with the PRD:**
> While a true-zero-highlight week is handled gracefully in the user experience (delivering an approved honest notice: *"No confirmed highlights for this game"* without fabricating synthetic filler), safe withholding does **NOT** count as a successful highlight delivery in the core metric numerator. An all-true-zero week remains counted in the denominator as an honest zero-highlight miss rather than a tagging failure, ensuring the primary metric strictly measures positive, verified highlight delivery.

### Denominator Integrity Rules
1. **No Silent Drops:** An eligible rostered child cannot be removed from the denominator because the coach forgot to review clips or because video processing failed.
2. **Missing Recipients:** If a parent email is invalid, the record remains in the denominator as a `Held/Unresolved Delivery Miss`.
3. **Hard 7-Day Cutoff [Target]:** Cutoff occurs at $T + 7\text{ days}$. Any manifest not audited and delivered by cutoff is permanently scored as a failure for that cohort.

---

## 5. The Four-Tier Miss Taxonomy

When $Y_i = 0$, the failure must be mapped to exactly one primary root-cause category in strict hierarchical order:

```
                      PRIMARY MISS CLASSIFICATION HIERARCHY
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. WRONG-CHILD ATTRIBUTION (Severity 1 - Safety & Integrity Failure)        │
│    Independent QA audit identifies >=1 clip where focal child != recipient  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. HELD / UNRESOLVED PIPELINE (Severity 2 - Operational Blockage)           │
│    Unresolved coach review, missing guardian consent, or failed render      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. ZERO HIGHLIGHTS (Severity 3 - Honest Empty State)                        │
│    Sub-classified into True-Zero (Playtime/Action) vs Missed-Moment (CV Gap)│
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. DELIVERY TRANSPORT FAILURE (Severity 4 - Network / Infrastructure)       │
│    Approved manifest committed, but SMS/Email webhook returned 5xx/timeout  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Statistical Power & Wilson Score Confidence Bounds
If pilot audits cover only some deliveries, sample sizes are bounded. For a sample of $n$ audited child reels with $k$ correct deliveries ($\hat{p} = k/n$), the 95% confidence interval is calculated via the **Wilson Score Interval**:

$$w = \frac{\hat{p} + \frac{z^2}{2n} \pm z \sqrt{\frac{\hat{p}(1-\hat{p})}{n} + \frac{z^2}{4n^2}}}{1 + \frac{z^2}{n}}$$

Where $z = 1.96$ for a 95% confidence level.

**Proposed Pilot Gate [Target]:** Before moving from Phase 1 to wider rollout:
$$w_{\text{lower}} \ge 0.95 \quad \text{at } n \ge 500 \text{ audited clips}$$

Worked examples (computed): 500 of 500 correct gives a lower bound of about 0.992. 485 of 500 (97%) gives about 0.951, barely passing. 480 of 500 (96%) gives about 0.939, failing.

Notes: (1) This gate counts audited clips, while CCDR counts child-weeks, so the two units need reconciling. (2) The gate only guards wider rollout. This repo does not plan to relax per-clip coach review at any phase.
