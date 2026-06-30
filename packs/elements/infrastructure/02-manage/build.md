---
id: infrastructure.02.build
pack: infrastructure.02
pack_type: element
part: build
title: "Infrastructure → Manage — Build / Install"
version: 0.1.0
owner: morgan
trust: draft
gate: test
tested_in: null
verify_notes: ""
templates: [templates/infrastructure/asset-import.csv]
band_from: 1
band_to: 2
---

Configure the infrastructure asset types/fields, the discovery source, and the import path.
🔎 prove in sandbox.

| # | Claim to prove | How | Pass? |
|---|---|---|---|
| V1 | Infra asset types/fields incl. mandatory attrs exist/creatable | Admin → Asset Management | ☐ |
| V2 | Discovery populates CIs + attributes; idempotent on re-run | run twice; check dupes | ☐ |
| V3 | Bulk import (the CSV shape, name/id matching) | import sample | ☐ |
| V4 | "Owner/location blank" exception report is buildable | build the report | ☐ |

Promotion: pass → `tested` → sign-off → `live`; corrections → findings (§4.7).
