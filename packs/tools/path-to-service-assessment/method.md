---
id: path-to-service-assessment.method
pack: path-to-service-assessment
pack_type: tool
part: method
title: "Assessment method — how it runs"
version: 0.1.0
owner: roxanne
trust: draft
gate: review
---

# Method — how the assessment runs

## Three lenses, always all three
1. People — structured interviews: service owner(s), ops/incident lead, asset/CMDB owner, one consuming team lead. What do they believe is true?
2. Instance — inspection of the Freshservice instance against the checklist in build.md. What is actually configured?
3. Data — sampling exports against the completeness probes in build.md. What is actually in the records?

Divergence between lenses is itself a finding. Belief ≠ instance ≠ data is the most common state in the wild.

## Scoring discipline
Score indicator sets as evidence arrives; hold a scoring session to settle contested cells before playback. Never score live in the playback meeting.

## Outcome selection workshop
Run with the 35-outcome catalogue. The client shortlists what hurts; the assessor overlays what the baseline makes reachable. Agree 2–4 outcomes. More than 4 dilutes the roadmap into a wish list.

## Roadmap derivation — mechanical, not creative
1. For each chosen outcome pack, read its requires list ({pack, band} pairs)
2. Union the required cells; diff against the baseline grid → the gap list
3. Order the gap by depends_on — reference-data first, services.04 late
4. Attach effort_days from each pack's commercials; group into waves of sensible size
5. The result — waves → packs → effort — is both the delivery plan and the quote

The packs already encode the dependencies. Building the roadmap by intuition instead of the requires-diff is an anti-pattern; the diff is the method.

## Benefit baselining — do not skip
For each chosen outcome, capture the current value of its benefit_model metric during the assessment: audit prep days per audit, licence spend, MTTR, whatever the model names. Record source and date. This single step is what makes later ROI evidence rather than assertion.

## Anti-patterns
- Scoring from the org chart ("they have a CMDB team, so band 2")
- Letting the client pick eight outcomes
- Quietly upgrading a 1 to a 2 because the interviewee was convincing
