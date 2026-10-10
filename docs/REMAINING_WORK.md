# Remaining Work

Updated after the portfolio-projects pass. Items already done are listed at the end.

## 1. Immediate (small, no new infrastructure)

- [ ] Resolve the open decisions in `docs/CLAIMS_AND_EVIDENCE.md` section D.
- [ ] Check the source facts in section C against the original assessment files, then correct anything that differs.
- [ ] **Teardowns:** do the hands-on to-do lists in `projects/02` and `projects/03` (re-open every source link, try the products, add your own screenshots). Until then they are drafts.
- [ ] **Figma:** finish the file by hand (`projects/01-wireframes-v2/README.md`, "What is left in Figma"): brief page, flow, guardian page, three polish fixes, prototype links. The tool-call allowance on the Starter plan is used up for the month.
- [ ] Re-record `demo/prototype_walkthrough.mp4` from the corrected build, or label it "assessment build". Replace or archive the old `demo/` screenshots.
- [ ] Add the narrated video link once it is available again.
- [ ] Redeploy the Netlify build when you approve the changes (the hosted copy is the assessment build).
- [ ] Add a LICENSE file or state "all rights reserved".
- [ ] Prototype polish: "Unknown" display for missing fields (FR-5); close modals with Escape and trap focus; a screen-reader pass; replace `alert()` pop-ups with inline messages.
- [ ] Decide on the jersey-mismatch warning (proposed in wireframe C4).
- [ ] Decide whether to publish your own Instagram analysis as a second data project. It needs a fresh data pull and your consent to publish.

## 2. Livestream feasibility (bounded, no build commitment)
Follow `projects/07-livestream-feasibility-brief`. The plan runs Oct 10 to Oct 15, 2026 and ends in a one-page decision memo with real vendor input.

## 3. Future backend
- Data model from PRD section 7. Real roster and consent records.
- Login and roles (coach, club admin, guardian, QA auditor) with per-club access.
- Server-side preflight and approval at publish time (FR-21). Idempotency keys and a stored, immutable manifest (FR-22, FR-23).
- Durable audit log with coach, child and assignment version (FR-10).
- Real email/SMS provider, delivery receipts, retries.
- Reel rendering, token-gated guardian links (screens G1 to G4), opt-out and deletion jobs.
- A report-a-problem flow with immediate reel hiding (G4) and a QA audit tool (G5).

## 4. Future real AI
Follow `projects/06-premortem-and-ai-eval-plan`, part 2: build the evaluation set, measure by slice with intervals, run the error taxonomy to find real causes, and only then consider calibration. Per-clip coach review stays.

## 5. Future operations
- Coach review-time study and the usability test in `projects/01-wireframes-v2`.
- Independent QA audit process. Pick the audit size using the power analysis (`projects/04`, finding 5).
- Incident process for a wrong-child delivery: hide, notify, investigate, pause the club.
- Legal review (COPPA, GDPR-K, local rules) and guardian consent wording.
- Run the notification-timing experiment (`projects/05`) after the attribution fixes.
- Pilot club onboarding, support, and the CCDR measurement plan.

## Done in this pass
- Prototype bugs fixed and covered by 72 browser checks (`tests/`).
- Public documents corrected, with claims labelled (`docs/CLAIMS_AND_EVIDENCE.md`).
- Coach wireframes (13 screens) built in Figma; guardian and QA wireframes built as HTML; user flow in the repo as Mermaid.
- Data analysis, experiment design, pre-mortem and AI evaluation plan, livestream brief written.
- Two teardown drafts written with sources and verification checklists.
