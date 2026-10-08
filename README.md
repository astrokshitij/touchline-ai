# TouchlineAI — Human-in-the-Loop Computer Vision & Highlight Engine for Youth Sports

[![Live Demo](https://img.shields.io/badge/Demo-Netlify%20Live-brightgreen?style=for-the-badge&logo=netlify)](https://sidelinereel-kshitij.netlify.app)
[![Zero External Dependencies](https://img.shields.io/badge/Dependencies-Zero%20External%20(Pure%20Vanilla)-blue?style=for-the-badge)]()
[![Mobile-First 375px](https://img.shields.io/badge/Viewport-375px%20Mobile--First-orange?style=for-the-badge)]()
[![Architecture](https://img.shields.io/badge/Architecture-HITL%20Active%20Learning-purple?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)]()

> **An executive case study, production PRD, and pure vanilla interactive prototype addressing the high-stakes intersection of youth computer vision, child safeguarding, and human-in-the-loop active learning.**
>
> Built by **[Kshitij Pandey](https://github.com/astrokshitij)** | Portfolio Showcase

---

## 🔗 Live Links & Artifacts

- 🚀 **Interactive Prototype (Web App):** [https://sidelinereel-kshitij.netlify.app](https://sidelinereel-kshitij.netlify.app)
- 🎬 **Video Walkthrough:** [Download / View Silent Screen Walkthrough (`demo/prototype_walkthrough.mp4`)](./demo/prototype_walkthrough.mp4)
- 📋 **Production PRD (24 Requirements):** [`specs/PRD_SPECIFICATION.md`](./specs/PRD_SPECIFICATION.md)
- ⚖️ **Strategic Prioritization & Trade-Off Memo:** [`specs/TRADE_OFF_ANALYSIS.md`](./specs/TRADE_OFF_ANALYSIS.md)
- 📊 **Mathematical Denominator Audit:** [`analytics/METRICS_DECONSTRUCTION.md`](./analytics/METRICS_DECONSTRUCTION.md)
- 🤖 **Agentic Multi-LLM Auditing Log:** [`logs/AGENTIC_WORKFLOW.md`](./logs/AGENTIC_WORKFLOW.md)

---

## 🏛️ Executive Summary: The $180k Dilemma

When deploying autonomous AI into sensitive consumer environments—specifically youth sports involving minor children—**algorithmic confidence is not ground-truth safety**.

```
                           THE STRATEGIC CONFLICT
┌─────────────────────────────────────────────────────────────────────────────┐
│ COMMERCIAL PRESSURE:                                                        │
│ Flagship Tier-1 Academy ($180k ARR, renewal in 6 weeks) demands:            │
│ "Ship unvetted weekend live streaming immediately or we churn."             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                      VS.                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ OPERATIONAL REALITY:                                                        │
│ Computer vision models routinely confuse similar jersey numbers:            │
│ Delivering clips of Jersey #4 into Jersey #14's personal reel at 94% conf.  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Strategic Decision
**Never amplify an unverified core product.** Streaming video live before solving child identity attribution and verified guardian authorization risks broadcasting minors without parental consent directly to the open internet.

1. **Prioritize Roster Tagging with Human-in-the-Loop (HITL) Verification:** Build a mandatory coach-review workflow ensuring zero wrong-child clips reach parents.
2. **Defend Core Retention:** Deconstruct vanity metrics to demonstrate that misattributed clips—not lack of streaming—drive customer dissatisfaction.
3. **Execute a Bounded Commercial Compromise:** Commit to a formal feasibility study for third-party streaming integration by **October 15, 2026**, without promising an unvetted build date or derailing core computer vision engineering.

---

## 🧠 The HITL Active Learning Architecture

Computer vision on degraded, low-elevation, wide-angle sports video suffers from optical distortion, fabric wrinkles, occlusion, and motion blur. High model confidence does not guarantee attribution correctness.

TouchlineAI deploys an **Active Learning & Exception Routing Engine** that transitions from complete human oversight to automated triage:

```
+-----------------------------------------------------------------------------+
|                      PHASE 1: COLD START (Current Phase)                    |
|                        100% Mandatory Coach Review                          |
|                                                                             |
|  [Raw Video] ──► [CV Detection] ──► [All Proposed Clips (100%)]             |
|                                                │                            |
|                                                ▼                            |
|                                     [Coach Review & Audit]                  |
|                                                │                            |
|                                                ▼                            |
|                                   [Validated Batch Publish]                 |
+-----------------------------------------------------------------------------+
                                       │
                                       ▼ Model Fine-Tuning & Weight Calibration
+-----------------------------------------------------------------------------+
|                     PHASE 2: ASSISTED VERIFICATION                          |
|                        High-Confidence Queuing                              |
|                                                                             |
|  [Raw Video] ──► [CV Detection] ──┬─► Confidence >= 0.85 ──► Rapid Swipe    |
|                                   │                                         |
|                                   └─► Confidence < 0.85  ──► Detailed Triage|
+-----------------------------------------------------------------------------+
                                       │
                                       ▼ Baseline Evaluation & Stratified QA
+-----------------------------------------------------------------------------+
|                    PHASE 3: EXCEPTION ROUTING ENGINE                        |
|                        Autonomous Active Learning                           |
|                                                                             |
|  [Raw Video] ──► [CV Detection] ──┬─► Confidence >= 0.90 ──► Auto-Validated*|
|                                   │   (Clear OCR, 1 Face)                   |
|                                   │                                         |
|                                   └─► Confidence < 0.80  ──► Coach Review   |
|                                       (OCR Ambiguity,        Exception Queue|
|                                        Bounding Collision)                  |
+-----------------------------------------------------------------------------+
*Subject to independent post-publication double-blind QA auditing.
```

---

## 📱 Interactive Prototype & Core Edge Cases

The standalone prototype (`site/index.html`) is built in **Pure Vanilla HTML5/CSS3/JavaScript** with **zero external dependencies, zero CDNs, and full 375px mobile-viewport responsiveness**.

It implements the complete client-side state machine governing the 24 functional requirements (`FR-1` to `FR-24`):

```
       1. Setup & Roster ──────► 2. Coach Review ──────► 3. Batch Publish
      (Confirm 12 Players)    (Inspect, Reassign, Purge) (Preflight & Idempotent)
```

### Core Verified Edge Cases

| Edge Case | Specification | Prototype Implementation & Verification |
|---|---|---|
| **High-Confidence Misattribution** | `FR-4`, `FR-8`, `FR-10` | Clip #2 displays synthetic jersey #4, but AI proposed Maya L. (#14) at **94% confidence**. Coach reassigns clip to Liam T. (#4). System immediately extracts clip from Maya, transfers to Liam, and logs an immutable audit trail. |
| **Mandatory Reason on Removal** | `FR-9`, `FR-11` | Discarding an unidentifiable moment requires selecting an explicit audit reason ("Unidentifiable Jersey", "Non-Focal Action"), permanently excluding the clip from all reels. |
| **Unresolved Assignments Blocker** | `FR-6`, `FR-17` | Every detected moment initializes as `unresolved`. Navigating to the Publish view with unresolved clips triggers a hard preflight block: *"Publication Blocked: 9 assignment(s) remain unresolved."* |
| **Missing Parental Consent Gate** | `FR-18`, `FR-20` | Sofia H. (#12) has missing guardian consent. System strictly prohibits partial silent publication; the entire team batch is blocked until consent is verified or an authorized exclusion is recorded. |
| **Honest Empty State (Zero Filler)** | `FR-13` | Noah B. (#9) has 0 confirmed moments. The system renders an honest no-highlight card: *"No confirmed highlights for this game."* Strictly zero synthetic clips or teammate actions are substituted. |
| **Idempotent Dispatch & Partial Retry** | `FR-22`, `FR-23` | Publishing commits an immutable manifest. Retrying a simulated transient transport failure (Lucas M.) dispatches exclusively to Lucas's parent without duplicate messaging to the remaining 11 parents. |

---

## 📊 Data Rigor & Denominator Audit

A key failure mode in product analytics is relying on vanity metrics calculated on conditioned user subsets. TouchlineAI enforces mathematical rigor across all telemetry:

### 1. The 92% Share Rate Vanity Trap
* **The Dashboard Claim:** 92% of parents share their child's highlight reel.
* **The Mathematical Reality:** The tracking event was instrumented only over **opened reels** ($D_{\text{opened}}$). Production logs revealed that **roughly 30% of generated reels were never opened**:
  
  $$S_{\text{effective}} = P(\text{Shared} \mid \text{Opened}) \cdot P(\text{Opened}) = 0.92 \times (1.0 - 0.30) = \mathbf{64.4\%}$$

Delivering misattributed clips directly drives the 30% non-opening rate. Fixing identity attribution is the fastest lever to unlock the remaining 35.6% of unrealized reach.

### 2. Stated vs. Revealed Preference (The Video Editor Fallacy)
* **Stated Survey Preference:** **58%** of 210 surveyed coaches and parents requested in-app editing and trimming tools.
* **Revealed Production Telemetry:** In 90 days of telemetry across all active accounts:
  
  $$\text{Full-Funnel Completion} = P(\text{Open Editor}) \times P(\text{Complete Edit} \mid \text{Open}) = 0.06 \times 0.0097 = \mathbf{0.058\% \quad (< 0.06\%)}$$

Fewer than 1 in 1,700 generated reels ever completed an edit. Building desktop video tools would have wasted 8 engineering weeks on a phantom use case.

### 3. North Star Metric: Correct-Child Delivery Rate (CCDR)
$$\text{CCDR} = \frac{\sum_{i \in \text{Cohort}} \mathbb{I}(\text{Complete-Week Verified Delivery}_i)}{|\text{Eligible Weekly Cohort}|}$$

The cohort includes **all eligible rostered children**, including unopened, unpublished, and zero-highlight outputs. Every record must be validated by independent QA audit before the hard 7-day cutoff.

---

## 📂 Repository Directory Tree

```
touchline-ai/
├── README.md                          <-- Executive case study & architectural guide
├── demo/                              <-- Visual assets & walkthrough media
│   ├── prototype_walkthrough.mp4      <-- 1080p full prototype screen recording
│   ├── 01-setup.jpg                   <-- Screen 1: Roster & match ingestion
│   ├── 03-review.jpg                  <-- Screen 2: Coach HITL verification
│   ├── 04-reassign.jpg                <-- Edge Case: 14 vs 4 reassignment modal
│   ├── 06-corrected.jpg               <-- Attribution updated to Liam T. (#4)
│   ├── 09-unresolved-block.jpg        <-- Preflight Gate: Unresolved assignments
│   ├── 19-consent-block.jpg           <-- Preflight Gate: Missing parental consent
│   ├── 20-noah-zero.jpg               <-- Honest empty state (0 highlights)
│   ├── 24-delivery-failed.jpg         <-- Fault tolerance: Transport drop
│   └── 25-retry-success.jpg          <-- Idempotent targeted retry
├── site/                              <-- Interactive Prototype
│   └── index.html                     <-- Zero-CDN, 100% offline Vanilla web app
├── specs/                             <-- Engineering & Product Specifications
│   ├── PRD_SPECIFICATION.md           <-- 24-requirement production PRD with schemas
│   └── TRADE_OFF_ANALYSIS.md          <-- $180k enterprise trade-off memo & matrix
├── analytics/                         <-- Quantitative Analytics & Data Rigor
│   └── METRICS_DECONSTRUCTION.md      <-- Mathematical denominator audit & formulas
└── logs/                              <-- Agentic Workflow & Auditability
    └── AGENTIC_WORKFLOW.md            <-- Multi-LLM audit log & hallucination rejection
```

---

## 🛠️ Verification & Test Suite

The interactive prototype has been verified through automated headless browser test scripts (`scratch/test_e2e.js`) using Chrome DevTools Protocol (CDP) at a native **375px × 812px mobile viewport**:

- [x] **Roster Binding (`FR-1`–`FR-3`):** 12 roster members cleanly bound.
- [x] **Detection Presentation (`FR-4`, `FR-5`):** Synthetic clips render with timestamps and confidence tags.
- [x] **High-Confidence Reassignment (`FR-8`, `FR-10`):** Jersey 4 (#14 Maya at 94%) successfully reassigned to #4 Liam; audit log logged.
- [x] **Mandatory Reason Removal (`FR-9`, `FR-11`):** Moment removed with audit reason.
- [x] **Preflight Gate Blocking (`FR-17`, `FR-18`):** Unresolved assignments and unconsented children block batch publishing.
- [x] **Batch Approval Invalidation (`FR-20`):** Modifying any assignment invalidates previous approval.
- [x] **Honest Zero Highlights (`FR-13`):** 0 clips for Noah B. renders honest notice without synthetic filler.
- [x] **Idempotency & Retry (`FR-22`, `FR-23`):** Duplicate publishing blocked; failed recipients retried cleanly without resending to delivered parents.
- [x] **Console Integrity:** 0 JavaScript errors, 0 external network requests, zero horizontal layout overflow.

---

## 👨‍💻 Author & Portfolio Attribution

- **Candidate / Architect:** **Kshitij Pandey**
- **GitHub:** [@astrokshitij](https://github.com/astrokshitij)
- **Live Deployment:** [https://sidelinereel-kshitij.netlify.app](https://sidelinereel-kshitij.netlify.app)
- **Original Context:** Prepared for Product Management / Technical Portfolio Showcase
