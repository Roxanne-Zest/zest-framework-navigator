---
id: infrastructure.03.commercials
pack: infrastructure.03
pack_type: element
part: commercials
title: "Infrastructure → Contextualise — Commercials"
version: 0.1.0
owner: morgan
trust: draft
gate: review
reviewed_by: null
effort_days: 6
band_from: 2
band_to: 3
unlocks: [change-impact-assessment, incident-management, problem-management, alerting, configuration-drift-detection]
---

# Infrastructure → Contextualise — Commercials

### SOW snippet (draft)
> *Relate the in-scope production infrastructure so that dependency, impact and root cause are
> visible. We will confirm the relationship model, configure the required relationship types
> and discovery mappings, populate relationships from discovery and an agreed manual source,
> and validate that every in-scope server carries its host, hosting, storage, network and
> location relationships with no orphans. Outcome: the infrastructure estate moves from a
> managed inventory to a contextualised one — the foundation for change-impact assessment,
> dependency-aware incident management and monitoring integration.*

### Effort & dependencies
- **Estimate:** 6 days (mid-size estate with working discovery). Calibrate against actuals.
- **Depends on:** `infrastructure.02` at band 2; a usable discovery source (or budget for
  manual mapping); client infrastructure team availability to confirm relationships.

### Acceptance
The Standard exit criteria, evidenced: coverage report at 100% of in-scope servers meeting
criterion 1; orphan list empty; a worked example of a change showing impacted applications.

### Band move & what it unlocks
Takes **Infrastructure: 2 → 3**. This is a load-bearing climb — it's a prerequisite for the
outcome packs *Change impact assessment*, *Incident management* (dependency context),
*Problem management* (root cause), *Alerting* (alert-to-CI) and *Configuration drift
detection*. The £ benefit is realised in those **outcome** packs' benefit models; this
element pack is the enabling cost they draw against.
