---
id: audit-compliance-evidence.commercials
pack: audit-compliance-evidence
pack_type: outcome
part: commercials
title: "Audit & compliance evidence — Commercials"
version: 0.1.0
owner: faith
trust: draft
gate: review
reviewed_by: null
effort_days: 4        # evidence layer only — see scope note
---

### SOW snippet (draft)
> *Produce [Cyber Essentials / ISO 27001 / SOX] compliance evidence on demand from the CMDB.
> We will confirm the standard's evidence set, build the reports and scheduled exports that
> produce each item, assemble a point-in-time audit pack, and validate it against an auditor's
> checklist. Outcome: audit preparation moves from a manual, time-boxed scramble to a report
> you can run — with coverage and scope provable, not asserted.*

### Effort, dependencies & the composition cost
- **Evidence layer:** 4 days (assuming the required element packs are at band).
- **Composition cost (the honest bit):** this outcome **requires** `reference-data.02`,
  `infrastructure.02/.03`, `applications.02/.03`, `end-user-devices.02`,
  `software-licences.02`, `services.04`. **Whichever aren't already delivered are added
  scope**, priced from their own packs. The SOW total = the evidence layer **+** the required
  element packs not yet in place. The navigator's resolved `requires` view gives the exact
  list to quote.
- Target standard scopes the set: **CE** needs only the `.02` inventory packs; **ISO** adds
  the `.03` packs and `services.04`.

### Acceptance
The evidence pack is producible on demand for the target standard; a dry run against an
auditor checklist passes; coverage and scope are evidenced from reports.

### Benefit
**Audit preparation effort (days/audit), reduced** — baselined against the last audit's prep
days, realised at the next. Recurs every cycle, so it compounds annually. Secondary, harder
to price but often the real driver: **lower risk of findings or a failed assessment.**

### What it satisfies
Delivers the **Audit & compliance evidence** outcome to band 2 (CE) / 3 (ISO A.8.9) / 4 (SOX
scope) depending on the required packs delivered.
