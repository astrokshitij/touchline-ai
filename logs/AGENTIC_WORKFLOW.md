# TouchlineAI — Agentic Workflow & AI Auditing Log
## Multi-Agent Orchestration, Hallucination Rejection & Human-in-the-Loop Engineering

- **Author & Auditor:** Kshitij Pandey ([@astrokshitij](https://github.com/astrokshitij))
- **Environment:** Multi-Model Orchestration (ChatGPT-4o, Gemini 1.5/3.8, Antigravity Agentic IDE)
- **Status:** Portfolio audit trail written at assessment time. The primary record is the original AI use log, kept outside this repo. This copy was not re-checked against it (for example the model name "Gemini 1.5 / 3.8" should be confirmed).
- **Post-assessment revision (October 2026):** An AI coding assistant (Claude Code) helped revise this repo's documents and prototype after the assessment closed. The author reviews all changes before publishing. See `docs/CLAIMS_AND_EVIDENCE.md`.

---

## 1. Executive Summary & Orchestration Architecture

The TouchlineAI project utilized an advanced multi-agent AI pair-programming and orchestration methodology. Rather than treating Large Language Models (LLMs) as autonomous decision-makers, we instituted an **Adversarial Human-in-the-Loop Oversight Architecture**.

```
                MULTI-AGENT ORCHESTRATION ARCHITECTURE
┌─────────────────────────┐         ┌─────────────────────────┐
│       ChatGPT 4o        │         │   Gemini 1.5 / 3.8      │
│  (Orchestrator & Spec)  │         │   (Evidence Analysis)   │
└────────────┬────────────┘         └────────────┬────────────┘
             │                                   │
             ▼                                   ▼
┌─────────────────────────────────────────────────────────────┐
│                 HUMAN AUDITOR (Kshitij Pandey)              │
│       * Strict Verification against Source Evidence         │
│       * Mathematical Validation of Denominators             │
│       * Falsification & Hallucination Rejection             │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Antigravity Agentic IDE                     │
│         * Pure Vanilla Prototype Construction               │
│         * Automated E2E Headless Browser Testing            │
│         * 375px Mobile Viewport Validation                  │
└─────────────────────────────────────────────────────────────┘
```

### Core Audit Principle
> **"Every assertion must trace to an empirical source record. Synthetic models must never invent engineering causes, substitute metrics, or weaken safety gates."**

---

## 2. Deep Dive: Caught & Rejected AI Hallucinations

During the engineering lifecycle, the AI agents produced sophisticated hallucinations that would have catastrophically degraded system safety and strategic rigor if accepted uncritically. Below are the key rejected claims:

### Case Study 1: The Gemini "Fabric-Fold OCR" Hallucination
- **Context:** Analyzing customer complaints regarding jersey number misidentifications across clubs (#4 vs #14 at Tier-1 Academy, #1 vs #11 at Cobblestone FC).
- **AI Proposed Output (Gemini):**
  > *"The failure is caused by an OCR character-segmentation model defect where fabric folds and jersey wrinkles cause the neural network to mistakenly segment single-digit numbers into two bounding boxes, misclassifying 4 as 14."*
- **Human Verification:** Checked source incident reports (`S4`, `S5`, `S6`).
- **Audit Finding:** The source records contain **zero** technical root-cause data. They describe only observed user outcomes (a clip of player #4 appeared in player #14's reel). No camera specifications, model weights, or OCR layer logs were provided.
- **Action Taken:** **REJECTED.** Deleted all speculative claims about "fabric folds" and "segmentation weights." Replaced with honest, unembellished problem framing: *observed jersey number confusion requiring mandatory visual human verification*.

---

### Case Study 2: The Reel-to-User Substitution Fallacy
- **Context:** Reviewing telemetry indicating that roughly 30% of generated recap reels were unopened.
- **AI Proposed Output (Gemini):**
  > *"Nearly a third of our user base receives zero value from the product and is in immediate danger of churn due to unengaging highlight delivery."*
- **Human Verification:** Compared against raw database schema definitions (`S3`, `S11`).
- **Audit Finding:** Telemetry tracks **reels**, not **unique user accounts**. A single parent of multiple players receives multiple reels; a team generated multiple game recaps. Equating 30% unopened reels to "30% of users receiving zero value" substituted a conditioned artifact count for a user retention metric.
- **Action Taken:** **REJECTED.** Enforced strict mathematical separation between reel open rates ($P(\text{Opened}) = 0.70$) and user-level cohort retention.

---

### Case Study 3: The Antigravity Builder "Bulk Confirmation" Safety Bypass
- **Context:** Designing the Coach Review interface in `site/index.html`.
- **AI Proposed Output (Antigravity Builder):**
  > Added a *"Quick Confirm All Uncontested (9 Matches)"* bulk-action button to expedite the coach review workflow.
- **Human Verification:** Audited the proposed code against Functional Requirements (`FR-6`, `FR-7`, `FR-17`).
- **Audit Finding:** The core edge case of the entire platform was that **Clip #2 was assigned to player #14 at 94% confidence, despite visibly showing jersey #4**. A bulk-confirm button would encourage coaches to bypass visual inspection, publishing the very wrong-child clip the platform was designed to prevent.
- **Action Taken:** **REJECTED & REMOVED.** Deleted `quickConfirmUncontested()` from the codebase. Enforced mandatory per-clip individual review. Every single moment initializes as `unresolved` and requires an intentional human action.

---

### Case Study 4: The Premature "100% Zero Error" Victory Banner
- **Context:** Rendering the post-publication success screen.
- **AI Proposed Output (Antigravity Builder):**
  > *"Batch Published Successfully! 100% Zero Wrong Child Delivered to Guardians."*
- **Human Verification:** Evaluated against evaluation rubric and statistical principles.
- **Audit Finding:** A coach clicking "Confirm" does not establish ground-truth accuracy; human coaches suffer from confirmation bias and fatigue. Claiming "100% Zero Wrong Child Delivered" at publish time is an unverifiable boast.
- **Action Taken:** **REJECTED.** Replaced banner with honest, humble engineering notification:
  > *"Batch simulated dispatch complete for 12 authorized recipient(s). Notice: Coach confirmation does not establish ground-truth accuracy; independent pilot QA audit determines correctness."*

---

## 3. Comprehensive Chronological Audit Ledger

| Timestamp / Stage | Task | AI Agent | AI Proposed Output | Human Auditor Intervention | Rationale & Verification Method |
|---|---|---|---|---|---|
| **Phase 0: Setup** | Environment & Template Configuration | ChatGPT-4o | Read orchestrator playbooks and generated boilerplate template directories. | Verified template fidelity against domain specifications using Python scripts. | Confirmed clean separation between prompt scaffolding and project deliverables. |
| **Phase 1: Evidence Audit** | Customer Incident Analysis | Gemini 1.5; ChatGPT-4o | Asserted that 30% unopened reels represented catastrophic user churn and diagnosed an OCR segmentation model failure. | **REJECTED** both claims. Retained only verified facts: 4 incidents across 3 clubs; ~30% unopened reels. | Verified against source tickets; neither user denominator nor OCR root-cause existed in evidence. |
| **Phase 2: Prioritization** | Roadmap Trade-off Decision | ChatGPT-4o | Generated weighted decision matrix ranking Roster Tagging first, Livestreaming third. | Validated weights (Core Impact 35%, Evidence 30%, Breadth 20%, Commercial 15%). | Recomputed weighted sums via script; locked tagging as #1 and deferred streaming to bounded feasibility. |
| **Phase 3: Spec Drafting** | PRD Formulation (FR-1 to FR-24) | ChatGPT-4o | Drafted initial requirements, but left processing fallback and mixed-game weekly success metrics loosely defined. | Enforced strict Processing Readiness contract (`processing_ready`) and formal Wilson-interval aggregation rules. | Ran desk-review test against likely engineering blockers; resolved all ambiguities before implementation. |
| **Phase 4: Prototype UI** | Interactive Web Prototype | Antigravity | Included a bulk-confirmation button and premature "100% accuracy" delivery banners. | **REJECTED & PURGED** bulk confirm and unverified accuracy claims; restored individual review. | Manual code review and E2E DOM inspection; verified compliance with FR-6, FR-7, and FR-21. |
| **Phase 5: Preflight Gates** | Publication Blocker Verification | Antigravity | Allowed partial publication where unconsented children were silently excluded from the delivery batch. | **REJECTED** silent quarantine. Enforced atomic batch holding (FR-17, FR-18) requiring explicit consent or exclusion. | Automated test suite in `scratch/test_e2e.js` verifying hard block on missing consent. |
| **Phase 6: E2E Testing** (historical; the original `scratch/test_e2e.js` is not in this repo, and a new suite is in `tests/`) | Headless Chrome Automation | Antigravity | Ran 12 automated test cases via Chrome DevTools Protocol at 375px mobile viewport. | Verified that all 12 test assertions passed with 0 console errors and zero horizontal overflow. | Reviewed test execution logs and CDP output buffers. |
| **Phase 7: Asset Synthesis** (the repo copy of the video is the silent screen recording; the narrated version was submitted separately) | Walkthrough Video & Narration | ChatGPT-4o | Synthesized spoken narrative aligning screen states with strategic PRD trade-offs. | Verified spoken cues against actual public prototype click-paths and captured video frames. | Frame-by-frame verification of 182.5s H.264 video at 1920x1080 resolution. |

---

## 4. Key Takeaways for Agentic Software Engineering

1. **AI is an Accelerator, Not an Oracle:** LLMs excel at drafting structural schemas and synthesizing edge-case matrices, but will enthusiastically invent plausible-sounding technical diagnoses when evidence is incomplete.
2. **Denominators Matter:** AI agents frequently substitute available sample statistics for population parameters. Human statistical auditing is mandatory.
3. **Safety Must Be Hardcoded in the Spec:** If a prompt asks an AI to "make the workflow faster," it will naturally generate shortcuts (like bulk-confirm buttons) that bypass the very safety checks the product was created to enforce.
