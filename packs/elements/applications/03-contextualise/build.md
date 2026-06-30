---
id: applications.03.build
pack: applications.03
pack_type: element
part: build
title: "Applications → Contextualise — Build / Install"
version: 0.1.0
owner: race
trust: draft
gate: test
tested_in: null
verify_notes: ""
templates: [templates/applications/app-relationship-import.csv]
band_from: 2
band_to: 3
---

Reuse the relationship types (from `infrastructure.03`), add discovery mappings for app
dependencies, import logical ones. 🔎 prove in sandbox.

| # | Claim to prove | How | Pass? |
|---|---|---|---|
| V1 | Required relationship types exist (Runs on / Depends on / Sends data to) | confirm in instance | ☐ |
| V2 | The hosting edge is created once, not duplicated by both packs | create via one source; check | ☐ |
| V3 | App-dependency import (CSV shape) works | import sample | ☐ |
| V4 | Orphan-app report buildable | build report | ☐ |

Promotion: pass → `tested` → sign-off → `live`; corrections → findings (§4.7).
