---
id: reference-data.02.build
pack: reference-data.02
pack_type: element
part: build
title: "Reference data → Manage — Build / Install"
version: 0.1.0
owner: faith
trust: draft
gate: test
tested_in: null
verify_notes: ""
templates: [templates/reference-data/reference-sets.csv]
band_from: 1
band_to: 2
---

Configure each reference set as a managed lookup (or the instance's nearest equivalent) and
load from source. 🔎 every specific below is to prove in sandbox.

| # | Claim to prove | How | Pass? |
|---|---|---|---|
| V1 | Locations/departments/etc. can be held as managed lookups | Admin → asset fields / dropdowns | ☐ |
| V2 | Values import in bulk (the CSV shape) | import `reference-sets.csv` | ☐ |
| V3 | A CI field can be bound to the lookup (not free text) | configure + test on a CI | ☐ |
| V4 | Existing free-text values can be reconciled to the lookup | spot-migrate a few | ☐ |

Promotion: pass → `tested` (+`tested_in`) → sign-off → `live`; corrections → findings (spec §4.7).
