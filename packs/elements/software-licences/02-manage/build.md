---
id: software-licences.02.build
pack: software-licences.02
pack_type: element
part: build
title: "Software & licences → Manage — Build / Install"
version: 0.1.0
owner: race
trust: draft
gate: test
tested_in: null
verify_notes: ""
templates: [templates/software-licences/licence-import.csv]
band_from: 1
band_to: 2
---

Configure the software/licence asset type and the SaaS Management / licence feed. 🔎 prove in
sandbox.

| # | Claim to prove | How | Pass? |
|---|---|---|---|
| V1 | Software/licence type with entitlement, consumed, support-status fields exists | Admin → Asset Management | ☐ |
| V2 | SaaS Management surfaces entitlement + consumption (and how) | check SaaS Management data | ☐ |
| V3 | Licence → application relationship can be set | link one, confirm | ☐ |
| V4 | "Over-allocated / unsupported" report buildable | build report | ☐ |

Promotion: pass → `tested` → sign-off → `live`; corrections → findings (spec §4.7).
*(Licence-reclaim mechanics live here — the licence-rotation quirks you'll train in land in
this pack's owning skill.)*
