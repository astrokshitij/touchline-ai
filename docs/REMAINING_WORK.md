# Remaining Work

## 1. Immediate (small, no new infrastructure)

- [ ] Resolve the open decisions in `docs/CLAIMS_AND_EVIDENCE.md` section D.
- [ ] Check the source facts in section C against the original files, then correct anything that differs.
- [ ] Re-record `demo/prototype_walkthrough.mp4` from the corrected build, or label it "assessment build". Replace or archive the old `demo/` screenshots.
- [ ] Add the narrated video link once it is available again, and replace "currently unavailable" in the README.
- [ ] Redeploy the Netlify build after you approve this pass (the hosted copy is the assessment build).
- [ ] Add a LICENSE file or state "all rights reserved".
- [ ] Prototype polish: an "Unknown" display for missing fields (FR-5); close modals with Escape and trap focus; a screen-reader pass; replace `alert()` pop-ups with inline messages.
- [ ] Decide on the jersey-mismatch warning (section D, item 5).

## 2. Livestream feasibility (bounded; no build commitment)

Time-box it (the memo proposes Oct 15, 2026). Questions to answer, not build:
- Who may watch (private guardian viewing versus anything wider), and how is consent checked before and during a stream?
- Build or buy? Collect real vendor quotes and limits instead of estimating.
- What does the sideline network allow, and what happens when it drops?
- What can a coach review before or after a stream, and what needs a different control?
- Legal review of consent, retention and recording.
Output: a short written recommendation with real figures and a go / no-go that still needs an explicit decision.

## 3. Future backend

- Data model from PRD section 7 (club, team, game, child, moment, manifest). Real roster and consent records.
- Login and roles (coach, club admin, guardian, QA auditor) with per-club access.
- Server-side preflight and approval at publish time (FR-21). Idempotency keys and a stored, immutable manifest (FR-22, FR-23).
- Durable audit log with coach, child and assignment version (FR-10).
- Real email/SMS provider, delivery receipts, retries.
- Reel rendering and secure token-gated guardian links. Opt-out, deletion and retention jobs.

## 4. Future real AI

- Build an evaluation set from audited footage. Measure jersey reading and re-identification by condition (lighting, distance, similar numbers) before choosing models.
- Study real wrong-child errors to find causes. The current docs deliberately claim none.
- Only after that, decide whether confidence can be calibrated and used to order the queue. Per-clip coach review stays.
- Use coach corrections as training labels. Track model version on every moment.

## 5. Future operations

- Coach review-time study (is under 5 minutes realistic? what is a typical clip count?).
- Independent QA audit process: staffing, sampling, how the Wilson-interval gate is applied.
- Incident process for a wrong-child delivery: revoke, notify, investigate, pause the club.
- Legal review (COPPA, GDPR-K, local rules) and guardian consent wording.
- Pilot club onboarding, support, and the measurement plan for CCDR.
