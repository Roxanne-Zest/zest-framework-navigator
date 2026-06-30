---
id: services.04.standard
pack: services.04
pack_type: element
part: standard
title: "Services → Service ops — Standard"
version: 0.1.0
owner: morgan
trust: draft
gate: test
band_from: 3
band_to: 4
depends_on: [applications.03, infrastructure.03, reference-data.02]
---

**Each service:** named by **capability** (the CITIS principle — not by app or vendor); has a
**Service Owner**, a **Service Customer**, and a **criticality**; is mapped to its supporting
applications and infrastructure (service *Depends on* / *Made up of* its CIs).
**Exit criteria:** every in-scope service mapped to its supporting CIs; owner + customer +
criticality set; impact reads from a CI up to the services it supports.
**Proven when:** an incident or change on a CI shows the affected **services**, by criticality.
🔎 VERIFY how services are represented (service CI type / business-service object) and how
the service→CI mapping is built — see Build.
