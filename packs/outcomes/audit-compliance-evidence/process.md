---
id: audit-compliance-evidence.process
pack: audit-compliance-evidence
pack_type: outcome
part: process
title: "Audit & compliance evidence — Process"
version: 0.1.0
owner: faith
trust: draft
gate: review
reviewed_by: null
---

### Keeping evidence audit-ready (not scrambled-for)
- **Cadence** — the evidence pack regenerates on a schedule (e.g. quarterly) and ahead of any
  known audit, so it's never assembled cold.
- **Pre-audit dry run** — before the real audit, run the pack against the auditor's checklist;
  close gaps while there's time.
- **Drift watch** — coverage and scope are monitored between audits (the band-5 continuous
  rung; ties to `configuration-drift-detection` and `cmdb-health-data-quality`). Evidence
  degrading is caught early, not at audit time.

### Triggers
| Event | Action |
|---|---|
| Quarterly (or set cadence) | regenerate + retain the evidence pack |
| Audit scheduled | dry run vs checklist; remediate |
| Standard or scope change | re-map the evidence set; adjust `requires` |
| Coverage/scope drift detected | owner remediates before it reaches audit |

### Owner
Compliance / security owner runs the cadence; coverage % and scope match are the BAU health
metrics.

---
