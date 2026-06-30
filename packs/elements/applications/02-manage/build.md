---
id: applications.02.build
pack: applications.02
pack_type: element
part: build
title: "Applications → Manage — Build / Install"
version: 0.1.0
owner: race
trust: draft
gate: test
tested_in: null
verify_notes: ""
templates: [templates/applications/app-import.csv]
band_from: 1
band_to: 2
---

Configure the application asset type/fields and import. 🔎 prove in sandbox.

| # | Claim to prove | How | Pass? |
|---|---|---|---|
| V1 | Application asset type with the attribute set exists/creatable | Admin → Asset Management | ☐ |
| V2 | SaaS Management / discovery data can seed the catalogue | check available app data | ☐ |
| V3 | Bulk import (CSV shape) works | import sample | ☐ |
| V4 | Missing owner/criticality exception report buildable | build report | ☐ |

Promotion: pass → `tested` → sign-off → `live`; corrections → findings (§4.7).
