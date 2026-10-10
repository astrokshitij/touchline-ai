# TouchlineAI — Strategic Trade-off Analysis & Product Prioritization
## Navigating the $180k Enterprise Ultimatum vs. Foundational Computer Vision Integrity

- **Author:** Kshitij Pandey ([@astrokshitij](https://github.com/astrokshitij))
- **Status:** Case-study decision memo: the author's recommendation. No company or leadership team approved it.
- **Scenario:** Companies and customers come from the assessment brief (VentureStudio AI; a flagship club customer called "Enterprise Club Partner"). Labels: **[Source]** from the assessment materials (not re-checked here), **[Inference]** reasoning, **[Judgment]** the author's scoring or proposal.

---

## 1. Executive Context & The High-Stakes Dilemma

In the assessment scenario, the product team faced a high-stakes enterprise dilemma:

**The Enterprise Demand:**
The flagship customer, **Enterprise Club Partner (Tier-1 Academy)**, a **$180,000 contract** up for renewal in six weeks [Source], asked for live streaming of weekend matches immediately, or it might leave [Source].

**The Product Reality:**
At the same time, four support tickets from three clubs (Tier-1 Academy, Brightwater SC, Cobblestone FC) reported wrong-child clips, for example a jersey #4 clip in jersey #14's reel [Source]. The tickets give no cause. The 94%-confidence version of this case is the prototype's simulation, not a source fact.

Sending one child's highlights to another child's parent is a serious breach of trust and a safeguarding concern [Inference].

This document outlines the rigorous product reasoning, quantitative decision models, and commercial negotiation strategy used to resolve this conflict.

---

## 2. The Prioritization Decision Matrix

To compare roadmap candidates in a structured way, the memo uses a 4-dimension weighted score. The weights and the 1-5 scores are the author's judgment [Judgment], not measurements. The arithmetic below has been re-checked.

$$\text{Priority Score} = 0.35 \times \text{Core Impact} + 0.30 \times \text{Evidence Rigor} + 0.20 \times \text{Breadth} + 0.15 \times \text{Commercial Protection}$$

```
                ROADMAP PRIORITIZATION MATRIX
┌───────────────────────┬────────────┬──────────┬─────────┬────────────┬───────────┐
│ Feature Candidate     │ Core (35%) │ Evid(30%)│ Bth(20%)│ Comms(15%) │ Total Wtd │
├───────────────────────┼────────────┼──────────┼─────────┼────────────┼───────────┤
│ 1. Roster Tagging HITL│    5/5     │   4/5    │   3/5   │    4/5     │   4.15    │
│ 2. Notification Timing│    3/5     │   2/5    │   4/5   │    2/5     │   2.75    │
│ 3. Full Livestreaming │    2/5     │   2/5    │   1/5   │    5/5     │   2.25    │
│ 4. Parent Video Editor│    2/5     │   2/5    │   2/5   │    1/5     │   1.85    │
│ 5. Cosmetic Polish    │    1/5     │   1/5    │   1/5   │    1/5     │   1.00    │
└───────────────────────┴────────────┴──────────┴─────────┴────────────┴───────────┘
```

### Deep Dive into Candidate Rankings

#### 1. Roster Tagging & Coach HITL Correction (Score: 4.15 — RANK #1: SHIP NEXT)
- **Core Impact (5/5):** Direct fulfillment of the primary job-to-be-done: *"Deliver my child's highlights accurately."* Delivering the wrong child breaks the core value proposition irreversibly.
- **Evidence Rigor (4/5):** Concrete, corroborated ticket evidence from three separate clubs (Tier-1 Academy, Brightwater, Cobblestone) documenting jersey number collision (#4 vs #14, #1 vs #11).
- **Breadth (3/5):** Directly affects every match, every team, and every generated reel.
- **Commercial Risk Protection (4/5):** If highlights remain inaccurate, no parent will pay subscription fees, rendering any downstream upsell (including streaming) worthless.

#### 2. Notification Timing Optimization (Score: 2.75 — RANK #2: RUNNER-UP)
- **Core Impact (3/5):** The materials report a link between notification timing and open rates (70% versus 85% for Sunday evening versus Saturday afternoon) [Source; correlation only, not re-checked here].
- **Evidence Rigor (2/5):** Correlational, not a controlled test, so it does not show that changing the timing would raise opens.
- **Decision:** Validate behavioral open patterns before re-architecting notification microservices.

#### 3. Full Live Video Streaming (Score: 2.25 — RANK #3: DEFERRED / INVESTIGATE BOUNDED)
- **Core Impact (2/5):** Shifts TouchlineAI from an asynchronous highlight engine into a synchronous live broadcast utility—a different kind of product. Its cost and effort have not been estimated [Inference].
- **Evidence Rigor (2/5):** Driven by executive feedback from a single club executive rather than broad parent demand.
- **Commercial Exposure (5/5):** $180,000 seasonal account at risk.
- **Decision:** Make no build commitment. Run a bounded feasibility investigation first (what is needed, who owns consent and access, build versus buy), then decide.

#### 4. Parent In-App Video Editor Controls (Score: 1.85 — RANK #4: REJECT / DEPRIORITIZE)
- **Core Impact (2/5):** Enables parents to trim clips or re-order music.
- **Evidence Rigor (2/5):** Stated preference anomaly (58% survey request) completely refuted by telemetry (<0.06% funnel completion).
- **Decision:** Do not allocate engineering cycles to desktop editing tools.

#### 5. Cosmetic Polish: Watermarks & App Icons (Score: 1.00 — PARKED)
- Customer support ticket explicitly noted watermark opacity defect was "not urgent." Parked to preserve focus.

---

## 3. Deconstructing the Enterprise Ultimatum ($180k ARR)

### Why Diverting Engineering to Streaming Now Is Risky

This is the author's reasoning [Inference], not a forecast:

```
                      THE CATASTROPHIC ESCALATION TRAP
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Engineering Diverted:                                                    │
│    Effort moves from identity attribution to streaming                      │
│                                      │                                      │
│                                      ▼                                      │
│ 2. Unresolved Identity Errors:                                              │
│    Wrong-child clips keep reaching parents                                  │
│                                      │                                      │
│                                      ▼                                      │
│ 3. Added Safeguarding Risk:                                                 │
│    Live video of children with no consent or access rules designed yet      │
│                                      │                                      │
│                                      ▼                                      │
│ 4. Trust & Legal Exposure:                                                  │
│    Possible regulatory exposure (needs legal review) and lost parent trust  │
└─────────────────────────────────────────────────────────────────────────────┘
```

1. **Different engineering profile:** Highlights can be produced after the match. Live video must reach viewers with little delay, possibly over a weak sideline connection. No cost or effort estimate exists. The feasibility investigation would produce the first one.
2. **Safeguarding and consent:** A coach cannot review a live stream before viewers see it, so consent and access controls would have to be designed up front. Legal exposure has not been assessed and needs legal review.
3. **Trust first:** If highlights keep going to the wrong child, parent trust suffers whatever else ships.

---

## 4. The Executive Negotiation Playbook

Rather than an outright refusal, we established a **Value Protection Negotiation Strategy**:

### Script & Communication Blueprint for Enterprise Club Executive
> Illustrative script written by the author for the case study; it was not delivered to anyone.
>
> *"We hear your board's desire to offer sideline viewing to distant grandparents. However, customer support tickets have documented repeated wrong-child highlight attributions—specifically confusing jersey #4 and #14—while ~30% of generated reels remain unopened across the dashboard cohort.*
>
> *If we stream video live before solving child identity attribution and guardian gating, we would be putting live video of children in front of viewers before consent and access rules are in place.*
>
> *Here is our firm commitment:*
> 1. *We are executing a phased pilot rollout establishing baseline safety and measuring coach review burden before any unmonitored expansion.*
> 2. *By **October 15, 2026** [proposed date], our team will deliver a feasibility assessment for private parental viewing, including whether to build or buy (third-party streaming SDKs such as LiveKit or Agora are named only as examples; none has been evaluated).*
> 3. *We will not commit a build date for streaming until the identity safety gates are working."*

### Why This Position Protects the Business
- It frames the decision around **protecting the club from parent backlash and privacy risk**.
- It provides a definitive milestone (**October 15, 2026**) rather than indefinite dismissal.
- It protects core engineering bandwidth from scope explosion.

---

## 5. Stated vs. Revealed Preference: The Editor Fallacy

A classic trap in product management is confusing what customers *say* they want with what they actually *do*.

```
                STATED VS. REVEALED PREFERENCE FUNNEL
┌─────────────────────────────────────────────────────────────────────────────┐
│ STATED PREFERENCE (Survey of 210 respondents across 40 clubs)               │
│ [████████████████████████████████████████████] 58% "We need editing tools!" │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ REVEALED TELEMETRY (90-Day Telemetry across All Accounts)                   │
│ [███                                         ] 6.0% Ever Opened Editor      │
│ [                                            ] <0.06% Finished an Edit      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Mathematical Breakdown
- Total Survey Demand: 58% across 210 respondents.
- Telemetry: Usage data shows 6% opened the editor and <1% of those finished, placing the funnel completion bound below 0.06%.
  $$\text{Funnel Completion} = P(\text{Open Editor}) \times P(\text{Finish} \mid \text{Open Editor}) \le 0.06 \times 0.01 < 0.0006 \quad (< 0.06\%)$$

### Strategic Takeaway
One possible reason for the gap is that people asked for editing hoping to fix bad clips [Hypothesis, not tested]. The two numbers also come from different groups and times (survey respondents versus account telemetry), so the comparison is suggestive, not exact.

An 8-week editor build was proposed [Source]. It would not address wrong-child delivery [Inference]. The data points toward fixing accuracy at the source, with coach review, before adding editing tools [Inference].

---

## 6. What Would Change My Mind? (Falsification Criteria)

The thresholds below are the author's proposals [Judgment], chosen for illustration:

1. **Verified Enterprise Renewal Cliff:** If Enterprise Club Partner legally validates that renewal is strictly contingent on a bounded livestream pilot AND an off-the-shelf SDK can be integrated via an external contractor without consuming core CV engineering hours.
2. **Empirical Tagging Error Irrelevance:** If an independent audit of 1,000 matches demonstrates that jersey misattribution affects $< 0.1\%$ of generated clips and non-opening is purely driven by notification delivery timing.
3. **Revealed Editor Demand Surge:** If a lightweight usability experiment shows parent editor completion spikes to $> 25\%$ when discoverability is increased.

Until those conditions are proven with empirical data, **Roster Tagging with Human-in-the-Loop Coach Verification remains our absolute #1 roadmap priority.**
