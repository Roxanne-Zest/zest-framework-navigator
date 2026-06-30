---
id: services.04.build
pack: services.04
pack_type: element
part: build
title: "Services → Service ops — Build / Install"
version: 0.1.0
owner: morgan
trust: draft
gate: test
tested_in: null
verify_notes: ""
templates: [templates/services/service-mapping.csv]
band_from: 3
band_to: 4
---

Represent services, create the service→supporting-CI relationships, add criticality. 🔎 prove
in sandbox — the service-mapping mechanism is the key unknown.

| # | Claim to prove | How | Pass? |
|---|---|---|---|
| V1 | How services are represented (service CI type vs business-service object) | Admin / CMDB structure | ☐ |
| V2 | A service can be mapped to its supporting CIs (which relationship?) | build one service end-to-end | ☐ |
| V3 | Impact rolls up: a CI shows the services it supports | raise a test incident on a CI | ☐ |
| V4 | Criticality field on services + reportable | configure + report | ☐ |
| V5 | Service mapping importable (CSV shape) | import sample | ☐ |

Promotion: pass → `tested` → sign-off → `live`; corrections → findings (§4.7). *(High-value
findings expected here — services/CMDB structure is where Freshservice specifics bite.)*
