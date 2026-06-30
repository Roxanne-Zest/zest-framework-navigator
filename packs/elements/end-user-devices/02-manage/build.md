---
id: end-user-devices.02.build
pack: end-user-devices.02
pack_type: element
part: build
title: "End-user devices → Manage — Build / Install"
version: 0.1.0
owner: race
trust: draft
gate: test
tested_in: null
verify_notes: ""
templates: [templates/end-user-devices/device-import.csv]
band_from: 1
band_to: 2
---

Configure the device asset type/fields and the MDM feed (or import). 🔎 prove in sandbox.

| # | Claim to prove | How | Pass? |
|---|---|---|---|
| V1 | Device asset type with assigned-user, OS, encryption fields exists/creatable | Admin → Asset Management | ☐ |
| V2 | MDM integration / discovery populates devices + attributes | check the available connector | ☐ |
| V3 | Bulk import (CSV shape) works | import sample | ☐ |
| V4 | "Unassigned device" / "no encryption state" exception report buildable | build report | ☐ |

Promotion: pass → `tested` → sign-off → `live`; corrections → findings (spec §4.7).
