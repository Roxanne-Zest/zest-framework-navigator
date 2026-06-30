---
id: audit-compliance-evidence.standard
pack: audit-compliance-evidence
pack_type: outcome
part: standard
title: "Audit & compliance evidence — Standard"
version: 0.1.0
owner: faith
trust: draft
gate: review        # what evidence a standard needs is audit-framework knowledge, not FS schema
reviewed_by: null
---

### What "good" looks like
For the target standard, every evidence request an auditor makes is answerable from a
**report or export**, current as of the run, **not** a hand-built spreadsheet.

### The evidence set (by standard)
- **Cyber Essentials** — a current asset inventory; every asset owned; in-scope devices
  identified; supported-software / patch position.
- **ISO 27001 (esp. A.8.9 Configuration management)** — the above, plus the **relationships**
  evidencing that configuration is managed (what depends on what), and a defined scope.
- **SOX (ITGC scope)** — the above, plus provable **scope**: which systems support financial
  reporting, evidenced through service mapping.

### Exit criteria
1. The **evidence pack** for the target standard is producible on demand from the CMDB.
2. Each evidence item traces to a query/report, not a manual artefact.
3. Coverage is provable (e.g. ownership at 100% of in-scope assets) — gaps are visible, not
   hidden.
4. The audit **scope** matches the CMDB scope (no in-scope system missing; no out-of-scope
   noise).

### Proven when
An auditor's evidence list is answered by running reports, in a sitting — not a fortnight of
preparation. A dry run against a real auditor checklist passes.

---
