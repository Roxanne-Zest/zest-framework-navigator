---
id: audit-compliance-evidence.build
pack: audit-compliance-evidence
pack_type: outcome
part: build
title: "Audit & compliance evidence — Build / Install"
version: 0.1.0
owner: faith
trust: draft
gate: test
reviewed_by: null
tested_by: null
tested_in: null
verify_notes: ""
templates: [templates/audit/evidence-pack-index.docx]
---

> Lighter than an element pack's Build — the data already exists (the required element packs
> built it). This is the **reporting / export layer**. Still test-gated: the reports must
> actually produce the evidence. **It can only be fully tested once the required element packs
> are present in the instance.**

### What's being configured
The evidence reports/exports in Freshservice that produce each item of the evidence set, plus
the scheduled exports that assemble the audit pack.

- **Inventory evidence** — a report of all in-scope assets with class, owner, location,
  status. (CE.)
- **Ownership coverage** — % of in-scope assets with an owner; the exceptions list. (Proves
  criterion 3.)
- **Supported-software / patch position** — software & versions against support status. (CE.)
- **Configuration-management evidence** — the relationships view/export (what depends on
  what). (ISO A.8.9.)
- **Scope evidence** — assets/CIs by service, showing which support the in-scope services.
  (ISO scoping / SOX.)
- **Scheduled export** — the above bundled to the audit pack on a cadence, point-in-time
  stamped.

🔎 **VERIFY** — all report/export specifics below are proposals to prove in sandbox.

### Verification checklist — run in `zest-sandbox`, then promote
Record instance + platform version in `tested_in`; outcomes in `verify_notes`.

| # | Claim to prove | How to verify | Pass? | Notes |
|---|---|---|---|---|
| V1 | An asset-inventory evidence report (class/owner/location/status, in-scope filter) is buildable | build it in Analytics/Reports; export | ☐ | |
| V2 | Ownership coverage % + exceptions is queryable | build the report/filter | ☐ | |
| V3 | Software/version vs support-status is reportable | check SaaS/software data supports it | ☐ | |
| V4 | A relationships/config-management export is producible | export the relationship view (needs `.03` packs present) | ☐ | |
| V5 | A by-service scope report is producible | needs `services.04` present; build it | ☐ | |
| V6 | Reports can be **scheduled/exported** on a cadence, point-in-time | configure a scheduled export | ☐ | |
| V7 | The export format suits an evidence pack (PDF/CSV the auditor accepts) | export, inspect | ☐ | |

**Promotion:** rows pass (or are corrected and re-drafted) → `trust: tested` (+`tested_in`)
→ owner sign-off → `live`. Every correction becomes a **finding** routed to the owning skill
(spec §4.7).

---
