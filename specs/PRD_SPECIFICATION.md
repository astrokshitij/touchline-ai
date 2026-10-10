# TouchlineAI — Product Requirements Document (PRD)
## Human-in-the-Loop Computer Vision & Highlight Engine for Youth Sports

- **Document Version:** 3.1 (case-study specification, revised after the assessment)
- **Author:** Kshitij Pandey ([@astrokshitij](https://github.com/astrokshitij))
- **Status:** Portfolio case-study draft. It has not been approved, reviewed or built by any company or engineering team.
- **Scenario:** Companies and customers named here come from the assessment brief (VentureStudio AI; a flagship club customer called "Enterprise Club Partner"). All prototype data is fictional.
- **Domain:** Computer Vision (CV), Active Learning, Minor Child Safeguarding. Consent and privacy rules such as COPPA and GDPR-K may apply. This document is not legal advice and has had no legal review.

> **How to read the labels.** **[Source]** = stated in the assessment materials (not re-checked in this repo; see `docs/CLAIMS_AND_EVIDENCE.md`). **[Inference]** = reasoning from source facts, not proven. **[Target]** = a proposed number or policy with no validation behind it. **[Simulated]** = behaviour of the prototype with fictional data. Unlabelled requirements (FR-x) are design intent.

---

## 1. Executive Summary & TL;DR

**TouchlineAI** is an AI-powered sports highlights platform designed to detect, tag, and deliver personalized game clips of youth athletes directly to verified guardians. 

### Core Architectural Principle
**Zero Unvetted Autonomous Publication.** Four support tickets across three clubs [Source] describe a clip of one child landing in another child's reel, each involving similar jersey numbers (#4/#14, #1/#11, #7/#17). The tickets give no technical cause, so this spec assumes none (not blur, not occlusion, not OCR). The "#4 shown as #14 at 94% confidence" case is the prototype's own scenario [Simulated]. It illustrates why a confidence score cannot replace a human check: a model can be confident and wrong.

To reduce the risk of wrong-child deliveries, which are a trust and safeguarding failure:
1. **Mandatory Human-in-the-Loop (HITL):** Every proposed highlight assignment—regardless of reported model confidence—must be explicitly confirmed, reassigned, or removed by the team's verified coach before publication.
2. **Atomic Batch Validation:** Highlights are published exclusively as an immutable, validated batch for the entire team. If any included child lacks verified parental consent or recipient destination, the entire batch is held.
3. **Honest Empty States:** A child with zero detected or confirmed highlights receives an honest, transparent notice ("No confirmed highlights for this game"). The system strictly prohibits synthetic filler or substituting teammate clips.

---

## 2. Problem Statement & Empirical Evidence

Youth sports video platforms face an existential tension between viral engagement features and core identity attribution. Four support tickets from three clubs, plus one analytics finding, shape this spec:

| Incident Source | Empirical Evidence | Systemic Implication |
|---|---|---|
| **Tier-1 Academy Ticket #1** [Source] | Jersey #4 highlight delivered into Jersey #14's personal reel. | [Inference] Similar numbers can be confused. The ticket does not say why. |
| **Brightwater SC Tickets #2 & #3** [Source] | Two separate wrong-child reel deliveries involving similar jersey numbers (#1 vs #11, #7 vs #17). | [Inference] The problem recurs at a second club. |
| **Cobblestone FC Ticket #4** [Source] | Player #11 clip assigned to Player #1. | [Inference] A third club, same pattern (similar numbers). Cause still unknown. |
| **Analytics log** [Source] | About 30% of generated reels were unopened. | [Hypothesis, not shown by the data] Wrong-child clips may reduce opening. The log does not establish that. |

### The Denominator Reality Check
While marketing dashboards highlighted a **92% share rate**, this metric was computed exclusively on *opened* reels ($D_{opened}$). Because about 30% of generated reels were never opened, the share rate across all generated reels is about **64%** ($0.92 \times 0.70 = 0.644$), assuming a reel that is never opened is never shared [Assumption]. The data does not show that accuracy is the main reason reels go unopened. Attribution is prioritised because a wrong-child delivery is a trust and safeguarding failure in its own right.

---

## 3. Goals & Explicit Non-Goals

### Goals
- **G-1 (Attribution Integrity):** No clip reaches a guardian without an explicit coach decision, and every published batch can be independently audited. Pilot target: zero known wrong-child deliveries [Target]. The pilot also measures coach review burden.
- **G-2 (Safeguarding):** Enforce guardian-consent gates before any asset is distributed. Whether this satisfies COPPA or GDPR-K needs legal review.
- **G-3 (Coach Ergonomics):** Deliver a frictionless, mobile-first (375px viewport) review interface aiming for full roster verification in under 5 minutes per match [Target, not tested with coaches].
- **G-4 (Delivery Transparency):** Provide unambiguous visibility into delivery states, supporting idempotent retry of failed transport destinations without duplicate delivery.

### Explicit Non-Goals
- **NG-1 (No Unvetted Livestreaming):** Reject unvetted, raw real-time streaming demands until core CV attribution and child consent infrastructures are hardened.
- **NG-2 (No Auto-Publish Bypasses):** No level of model confidence, even 99.9%, may bypass coach review. Confidence may only order the review queue and flag uncertain clips.
- **NG-3 (No Synthetic Filler):** Under no circumstances may the system pad a low-activity player's reel with team celebrations or other players' actions to simulate high engagement.
- **NG-4 (No In-App Non-Linear Video Editor):** Do not build heavy desktop-style clip trimming or timeline editing suites. Telemetry shows under 0.06% of accounts finished an edit [Source]; [Inference] this points to accuracy, not editing tools, as the better investment.

---

## 4. User Personas & Role-Based Access Control (RBAC)

```mermaid
graph TD
    CA[Club Administrator] -->|Manages Rosters & Consents| SYS((TouchlineAI Engine))
    CO[Assigned Team Coach] -->|Uploads Footage & Verifies Clips| SYS
    SYS -->|Dispatches Validated Batch| VG[Verified Guardian]
    QA[Independent QA Auditor] -->|Audits Sampled Deliveries| SYS
```

| Role | Permitted Actions | Strict Boundaries |
|---|---|---|
| **Assigned Coach** | Upload match footage; confirm active roster; review, reassign, or remove proposed moments; approve batch preview; trigger publication. | Cannot override missing parental consent; cannot add unrostered children; cannot access other clubs' teams. |
| **Verified Guardian** | View authorized personal highlight reel; view match summary; request data deletion or opt-out. | Cannot view unconfirmed draft clips; cannot access full unedited match footage; cannot view other children's reels. |
| **Club Administrator** | Provision teams, assign coach roles, manage verified guardian mappings, record legal consent forms. | Cannot publish match batches without coach attribution sign-off. |
| **Independent QA Auditor** | Review final delivery manifests against raw source video; calculate assignment precision and recall. | Read-only access; conducts post-publication double-blind audits. |

---

## 5. End-to-End User Flow (6 Core Steps)

1. **Footage Ingestion & Roster Confirmation:** Coach selects match footage (e.g., 72 min 1080p60) and confirms the active roster with game-specific jersey numbers.
2. **Automated Moment Detection & Proposed Tagging:** CV pipeline runs player detection, jersey OCR, and action recognition, outputting proposed player IDs and confidence scores.
3. **Mandatory Human Verification:** Coach reviews every proposed moment individually. For each clip, coach confirms proposal, reassigns to the true focal player, or removes unidentifiable footage with a mandatory audit reason.
4. **Resolution of Unresolved Assignments:** System checks all clips; unresolved assignments block progress. Players with zero confirmed clips are assigned an honest zero-highlight card.
5. **Preflight Validation & Batch Preview:** Coach previews each child's personalized reel and recipient mapping. Preflight engine verifies consent, recipient presence, and render readiness.
6. **Immutable Batch Commitment & Dispatch:** Coach authorizes publication. Engine creates an immutable manifest, dispatches SMS/email delivery notifications, and logs transport receipts.

---

## 6. Functional Requirements (FR-1 through FR-24)

### Data Association & Setup
- **FR-1:** The system shall associate every footage upload with exactly one unique Club ID, Team ID, and Game ID.
- **FR-2:** The setup view shall display the eligible team roster containing stable Child IDs, player names, and game-specific jersey numbers.
- **FR-3:** The assigned coach must explicitly confirm the roster snapshot before CV moment detection or review can be initiated.

### Detection Presentation & Review Mechanics
- **FR-4:** Each detected moment card must display a playable video clip, start/end timestamps, proposed child name, observed jersey number, and model confidence score.
- **FR-5:** In any instance where jersey number, child ID, or model confidence cannot be determined, the card must explicitly state "Unknown" rather than omitting the field.
- **FR-6:** Every detected moment must initialize in an `unresolved` state, regardless of whether model confidence is 0.50 or 0.99.
- **FR-7:** The interface must provide a one-click action for the coach to confirm the proposed child attribution.
- **FR-8:** The interface must provide a reassignment selector allowing the coach to reassign the moment to any eligible player on the confirmed roster.
- **FR-9:** The interface must provide a removal action allowing the coach to discard any moment from all player reels.
- **FR-10:** Every confirmation or reassignment event must record an immutable audit entry containing `coach_id`, `child_id`, `timestamp`, and `assignment_version`.
- **FR-11:** Every removal event must mandate the selection of an audit reason (e.g., "Unidentifiable / Obscured Jersey", "Incidental / Non-Focal Action", "Out of Bounds / Non-Play") and exclude the clip from all reels.

### Reel Construction & Preview
- **FR-12:** Each child's personal highlight reel must be compiled strictly and exclusively from moments confirmed for that specific child ID.
- **FR-13:** Any child with zero confirmed moments must display an honest empty state: *"No confirmed highlights for this game"*. No substitute clips, stock footage, or teammate actions may be inserted.
- **FR-14:** The preview screen must render each child's compiled reel alongside the verified guardian's delivery destination (email/SMS).
- **FR-15:** Reel thumbnail previews must be dynamically extracted from the first confirmed clip belonging to that specific child.
- **FR-16:** The coach must execute an explicit batch approval action covering all child reels and recorded exclusions prior to publication.

### Preflight Gates & Publication Integrity
- **FR-17:** Publication must be strictly blocked if any detected moment in the match remains in an `unresolved` state.
- **FR-18:** Publication must be strictly blocked if any included child lacks verified parental consent or an authorized delivery recipient.
- **FR-19:** Publication must be blocked unless the video processing readiness contract (`processing_ready == true`) is satisfied and all video clips are rendered.
- **FR-20:** Any modification to clip assignments, roster status, parental consent, or recipient destination after preview approval must instantly invalidate approval status (`batch_approved = false`), requiring re-approval.
- **FR-21:** The backend publication dispatch service must perform an atomic revalidation of all identity, consent, and recipient rules immediately prior to committing the manifest.

### Delivery, Idempotency & Fault Tolerance
- **FR-22:** Repeated execution of the publish command for an identical manifest version must be strictly idempotent, preventing duplicate SMS/email notifications.
- **FR-23:** When delivery fails for a subset of recipients, the system must maintain the immutable approved manifest and permit targeted retry of failed destinations only.
- **FR-24:** All prototype and simulation interfaces must clearly label detection and delivery as simulated to prevent confusion with production infrastructure.

---

## 7. Data Models & JSON Schemas

### 7.1 Game Footage & Processing Manifest (`GameFootageManifest`)
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "GameFootageManifest",
  "type": "object",
  "required": ["game_id", "team_id", "club_id", "footage_url", "raw_detection_status", "processing_ready"],
  "properties": {
    "game_id": { "type": "string", "format": "uuid" },
    "team_id": { "type": "string", "format": "uuid" },
    "club_id": { "type": "string", "format": "uuid" },
    "match_date": { "type": "string", "format": "date" },
    "footage_url": { "type": "string", "format": "uri" },
    "raw_detection_status": { "type": "string", "enum": ["pending", "processing", "completed", "failed"] },
    "processing_ready": { "type": "boolean" },
    "range_dispositions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "range_id": { "type": "string" },
          "start_sec": { "type": "number" },
          "end_sec": { "type": "number" },
          "status": { "type": "string", "enum": ["auto_complete", "manual_review_complete", "explicitly_excluded"] },
          "actor_id": { "type": "string" },
          "reason": { "type": "string", "nullable": true }
        }
      }
    }
  }
}
```

### 7.2 Moment Detection & Review Record (`MomentDetection`)
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "MomentDetection",
  "type": "object",
  "required": ["moment_id", "game_id", "start_timestamp", "end_timestamp", "status"],
  "properties": {
    "moment_id": { "type": "string", "format": "uuid" },
    "game_id": { "type": "string", "format": "uuid" },
    "clip_url": { "type": "string", "format": "uri" },
    "start_timestamp": { "type": "string" },
    "end_timestamp": { "type": "string" },
    "observed_jersey": { "type": "integer", "nullable": true },
    "proposed_child_id": { "type": "string", "nullable": true },
    "confidence_score": { "type": "number", "minimum": 0.0, "maximum": 1.0, "nullable": true },
    "model_version": { "type": "string" },
    "status": { "type": "string", "enum": ["unresolved", "confirmed", "reassigned", "removed"] },
    "final_child_id": { "type": "string", "nullable": true },
    "removal_reason": { "type": "string", "nullable": true },
    "audit_trail": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "actor_id": { "type": "string" },
          "action": { "type": "string" },
          "timestamp": { "type": "string", "format": "date-time" },
          "previous_child_id": { "type": "string", "nullable": true },
          "new_child_id": { "type": "string", "nullable": true }
        }
      }
    }
  }
}
```

### 7.3 Batch Publication Manifest (`BatchPublicationManifest`)
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "BatchPublicationManifest",
  "type": "object",
  "required": ["manifest_id", "game_id", "roster_version", "coach_approver_id", "approval_timestamp", "child_outputs"],
  "properties": {
    "manifest_id": { "type": "string", "format": "uuid" },
    "game_id": { "type": "string", "format": "uuid" },
    "roster_version": { "type": "string" },
    "coach_approver_id": { "type": "string" },
    "approval_timestamp": { "type": "string", "format": "date-time" },
    "idempotency_key": { "type": "string" },
    "child_outputs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "child_id": { "type": "string" },
          "player_name": { "type": "string" },
          "jersey_number": { "type": "integer" },
          "verified_recipient": { "type": "string" },
          "consent_verified": { "type": "boolean" },
          "confirmed_clip_ids": { "type": "array", "items": { "type": "string" } },
          "delivery_status": { "type": "string", "enum": ["pending", "delivered", "failed"] },
          "dispatch_timestamp": { "type": "string", "format": "date-time", "nullable": true },
          "error_code": { "type": "string", "nullable": true }
        }
      }
    }
  }
}
```

---

## 8. AI Computer Vision & Active Learning Architecture

### Using Confidence Safely
Confidence is a hint to the coach, never a way around the coach.

```
[ Raw Match Footage ]
        │
        ▼
[ Player detection, tracking, jersey reading, re-identification ]
   (candidate components, e.g. YOLOv8 / ByteTrack: illustrative only, not selected or benchmarked)
        │
        ▼
[ Proposed moments with proposed child + confidence ]
        │
        ├── every moment ──► starts "unresolved" ──► coach confirms, reassigns or removes (FR-6)
        │
        └── low confidence or unreadable number ──► flagged "Needs identification" and shown first
```

- No confidence value skips, auto-completes or delays review. Tiers such as "auto-validated at 0.90" or "delayed release at 0.80-0.90" are **not** part of this spec.
- No calibration data exists, so no numeric thresholds are proposed. Any flagging threshold should be set from audited pilot data [Target].
- The prototype colours confidence red under 60% and amber under 85%. These are display colours only [Simulated].

### Processing Readiness Contract
Raw detection status and `processing_ready` are strictly separated:
- If automated CV detection fails or times out, raw detection enters `failed`.
- The coach can trigger a manual range fallback. Upon inspecting footage, setting timestamps, and resolving all moments, the system sets `range_status = manual_review_complete`.
- `processing_ready` evaluates to `true` if and only if:
  1. Every footage range has a finalized disposition (`auto_complete`, `manual_review_complete`, or `explicitly_excluded`).
  2. At least one range is non-excluded.
  3. Video rendering for all clips succeeds.

---

## 9. System States & Failure Mode Matrix

| State / Edge Case | System Behavior | Recovery Mechanism |
|---|---|---|
| **Empty Setup** | Detection button disabled; display empty roster state. | Select valid match record and confirm roster. |
| **High-Confidence Misattribution** | CV model flags Jersey 4 as Child #14 at 94% confidence. | Coach reassigns clip to Child #4; system removes clip from #14's reel, adds to #4's reel, invalidates previous preview approval. |
| **Low-Confidence / Unreadable Jersey** | Low confidence or obscured number (threshold to be set from pilot data). | Flagged with a prominent warning; coach must explicitly choose a player or remove with a reason. |
| **Number Collision (Shared Jersey)** | Multiple roster players share same number across halves. | Both candidate names surfaced side-by-side; coach performs visual identification. |
| **Zero Confirmed Highlights** | Review completes with 0 clips for a player (e.g., Noah B.). | Honest empty state rendered: "No confirmed highlights for this game"; guardian notified of game participation without synthetic filler. |
| **Missing Consent / Recipient** | Roster child (e.g., Sofia H.) has unverified parental consent. | Hard preflight block on publication. Options: Record consent verification or record explicit exclusion with reason. Batch cannot publish partially. |
| **Transient Transport Drop** | SMS/email dispatch network failure for player (e.g., Lucas M.). | System records failed delivery receipt; renders targeted retry button. Retry dispatches to Lucas only; prevents duplicate SMS to remaining 11 parents. |

---

## 10. Top Post-Shipping Failure Modes & Mitigations

### Failure Mode 1: Confidently Wrong Assignments Survive Coach Review
- **Risk:** High model confidence (e.g., 94%) induces confirmation bias; a fatigued coach clicks "Confirm" without inspecting jersey details, delivering another child's clip.
- **Detection:** An independent QA auditor checks published manifests against source video. Phase 1 audits every batch (see section 14); later phases use a sample whose size is still to be set [Target].
- **Mitigation:** Any confirmed wrong-child incident triggers immediate revocation of the web reel, an audit investigation ticket, and automated UI friction (enlarging jersey crop preview) for that team.

### Failure Mode 2: Coach Review Burden & Fatigue Abandonment
- **Risk:** Coaches find reviewing every clip too time-consuming (assumed 15-25 clips per match, unvalidated; the prototype uses 11), resulting in abandoned drafts and parents never receiving highlights.
- **Detection:** Telemetry instruments median active review time, upper-tail (p95) review duration, and draft abandonment rates.
- **Mitigation ideas [untested]:** keyboard shortcuts, a fast one-clip-at-a-time review mode (each clip still needs its own decision, no bulk confirm), and a reminder after 24 hours.

---

## 11. Acceptance Criteria (BDD / Gherkin Format)

```gherkin
Feature: TouchlineAI Highlight Review & Publication Pipeline

  Scenario: Reassignment of High-Confidence Misattributed Jersey
    Given a detected moment with observed jersey 4 and proposed player "Maya S. (#14)" with confidence 0.94
    When the coach selects "Reassign" and picks "Liam T. (#4)"
    Then the moment is immediately removed from Maya's highlight reel
    And the moment is assigned to Liam's highlight reel
    And an audit log entry is recorded with coach ID, timestamp, and reassignment action
    And any existing batch approval status is invalidated

  Scenario: Blocking Publication on Unresolved Assignments
    Given 11 detected moments where 2 moments remain in "unresolved" status
    When the coach navigates to the Publish screen
    Then the "Approve & Publish Batch" action is disabled
    And a blocker alert displays "Publication Blocked: 2 assignment(s) remain unresolved (FR-17)"

  Scenario: Blocking Publication on Missing Parental Consent
    Given all 11 moments are resolved
    And player "Sofia H. (#12)" has consent status false
    When the coach navigates to the Publish screen
    Then the "Approve & Publish Batch" action is disabled
    And a blocker alert displays "Publication Blocked: Included child Sofia H. (#12) has missing guardian consent (FR-18)"

  Scenario: High confidence does not skip review
    Given a detected moment with proposed player "Ava K. (#5)" and confidence 0.99
    When the coach opens the Review screen
    Then the moment is "unresolved"
    And publication stays blocked until the coach confirms, reassigns or removes it

  Scenario: Clip that runs past the end of the footage
    Given footage that is 72:00 long
    And a detected moment starting at 71:55 lasting 8 seconds
    When the coach opens the Publish screen
    Then a blocker states the clip runs past the end of the footage
    And the "Approve & Publish Batch" action is disabled

  Scenario: Idempotent Delivery Retry on Transient Transport Drop
    Given a published batch with 11 successful deliveries and 1 failed delivery for "Lucas M."
    When the coach clicks "Retry Failed Deliveries"
    Then the system revalidates authorization for Lucas M.
    And dispatches delivery exclusively to Lucas M.'s guardian
    And does not trigger duplicate notifications to the 11 successfully delivered guardians
    And updates the manifest status to delivered upon success
```

---

## 12. Privacy, Safety & Child Safeguarding (COPPA / GDPR-K)

> Proposed design only. Retention periods, consent wording and legal basis need legal review.

1. **Authentication Boundary:** Video reels are private, unlisted, token-authenticated assets accessible only by the verified guardian.
2. **Zero Public Indexing:** Robot meta-tags and no-index headers prevent search engine indexing. External social sharing buttons are strictly disabled by default.
3. **Right to Be Forgotten / Opt-Out:** When a parent requests deletion or opt-out, the system revokes public access tokens immediately and marks raw source files for purge within 30 days [Target; period needs legal input].
4. **Incidental Minors:** If an opted-out child appears in the background of another child's highlight, the clip must be flagged for algorithmic background blurring or removed by coach review.

---

## 13. Metrics Framework & North Star Formulation

### Primary North Star Metric: Correct-Child Delivery Rate (CCDR)
$$\text{CCDR} = \frac{\text{Eligible Children with Confirmed, Audited, Correct Highlight Reels}}{\text{Total Eligible Generated Children in Weekly Cohort}}$$

- **Measurement note:** The numerator needs an independent audit of each counted record. If audits are sampled in later phases, CCDR becomes an estimate and should be reported with a Wilson interval (see `analytics/METRICS_DECONSTRUCTION.md`). The exact estimator is an open product decision.
- **Denominator:** Every eligible child rostered on an active team during the frozen weekly cohort (Monday 00:00 to Monday 00:00 local time). Must include unpublished, unopened, and zero-highlight records.
- **Numerator:** Children whose guardians received a verified delivery containing at least one correctly attributed highlight and zero misattributed clips, validated by independent QA audit.

### Safety Guardrails
- **Zero Known Wrong-Child Deliveries [Target]:** Any single confirmed wrong-child incident pauses pilot rollout for that club.
- **Review Latency [Target]:** Median coach review time stays at or under 4.5 minutes per match. No coach timing data exists yet.

---

## 14. Phased Rollout Plan

All gates below are proposals [Target]. None is validated.

```
Phase 1: Controlled Single-Club Pilot
  ├── 100% coach review of every clip
  ├── Independent QA audit of 100% of published reels
  └── No public sharing
        │
        ▼ Proposed gate: 50 clean matches and CCDR >= 95%, plus the Wilson-interval
        │ gate in the metrics doc (both to hold; product decision needed)
Phase 2: Regional League Expansion
  ├── Faster review tooling (queue ordering, one-clip-at-a-time mode). Every clip still needs a coach decision.
  ├── Sampled QA audit (rate to be set; 20% was floated)
  └── Optional guardian download, off by default
        │
        ▼ Proposed gate: audited results from Phase 2
Phase 3: General Availability
  ├── Coach review still required for every clip
  ├── Whether any review step could ever be relaxed is an open product decision,
  │   to be made only with audited evidence. It is not planned here.
  └── Coach corrections feed model improvement
```

---

## Appendix A. What the Prototype Covers

The prototype (`site/index.html`) runs in the browser with fictional data. It has no backend, no real video analysis and no real delivery.

| Requirement | In the prototype | Notes |
|---|---|---|
| FR-1 | Partly | A game selector only. No Club, Team or Game ID model. |
| FR-2, FR-3 | Yes | Fictional 12-child roster and a coach confirmation checkbox. |
| FR-4 | Partly | Start and end time, proposed child, observed jersey and confidence are shown. A drawn frame stands in for a playable clip. |
| FR-5 | Partly | An obscured jersey shows as "7 (Obscured)". There is no "Unknown" path for missing fields. |
| FR-6 to FR-9, FR-11 | Yes | Every clip starts unresolved. Removal requires a chosen reason. |
| FR-10 | Partly | In-memory text log with actor, time and assignment version. Lost on reload. Not an immutable store. |
| FR-12, FR-13, FR-14, FR-16 | Yes | Reels use confirmed clips only. Zero-highlight children get an honest notice. No playable reel. |
| FR-15 | Partly | Thumbnail is a close-up of the first confirmed clip's frame. |
| FR-17, FR-18, FR-20 | Yes | Blocks on unresolved clips and missing consent. Any change resets approval. |
| FR-19 | Partly | Checks detection finished and that no clip runs past the footage. No rendering or `processing_ready` contract. |
| FR-21 | Partly | Re-check runs in the browser before the simulated publish. A real system must do it on a server. |
| FR-22 | Partly | A one-time publish flag in the page. No idempotency key or server. |
| FR-23 | Yes (simulated) | One simulated failure (Lucas M.); retry reaches only that recipient. |
| FR-24 | Yes | Simulation is labelled. |
| Not built | | Roles and permissions (section 4), shared-jersey side-by-side view (section 9), incidental-minor handling (section 12), guardian-side views. |
