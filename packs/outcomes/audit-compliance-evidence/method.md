---
id: audit-compliance-evidence.method
pack: audit-compliance-evidence
pack_type: outcome
part: method
title: "Audit & compliance evidence — Method"
version: 0.1.0
owner: faith
trust: draft
gate: review
reviewed_by: null
effort_days: 4        # ESTIMATE — the EVIDENCE LAYER only; excludes the required element packs
---

### Step 0 — confirm the composition (the defining step of an outcome pack)
This outcome **requires** the element packs in `_pack.md` at their bands. **First action:
check they're at band.**
- Where present — proceed; this pack builds on them.
- Where **not** present — those element packs are the prerequisite work and are delivered
  first (they carry their own method/effort). The audit evidence layer cannot evidence data
  that hasn't been modelled. This is scoped explicitly in Commercials.

> For this engagement the `requires` set is: `reference-data.02`, `infrastructure.02/.03`,
> `applications.02/.03`, `end-user-devices.02`, `software-licences.02`, `services.04`. The
> navigator resolves these to what's already delivered vs still to draft — that resolved list
> *is* your prerequisite plan.

### Delivery sequence (the evidence layer)
1. Confirm target standard and its evidence set (Standard).
2. Map each evidence item to a CMDB query / report.
3. Build the evidence reports and scheduled exports (Build).
4. Assemble the **audit pack** — the bundled evidence for the standard.
5. **Dry run** against a real auditor checklist; fix gaps.
6. Set the refresh cadence and hand the runbook to the owner (Process).

### RACI
- **Zest:** builds the evidence reports/exports, assembles the pack, runs the dry run.
  *Responsible.*
- **Client compliance / security owner:** confirms the standard's requirements, signs the
  evidence as satisfying it. *Accountable.*
- **Auditor (external):** consulted via their evidence checklist.

### Effort
**4 days** for the evidence layer on a target standard **assuming the required element packs
are already at band.** If they're not, add their effort. Estimate — calibrate.

---
