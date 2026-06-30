---
id: services.04.method
pack: services.04
pack_type: element
part: method
title: "Services → Service ops — Method"
version: 0.1.0
owner: morgan
trust: draft
gate: review
effort_days: 10
band_from: 3
band_to: 4
depends_on: [applications.03, infrastructure.03, reference-data.02]
---

1. Confirm the `.03` relationship graph exists (you map services onto it). 2. Define the
service list with the business — capability-based. 3. Set owner / customer / criticality. 4.
Map each service to its supporting apps/infra using the relationship graph. 5. Validate impact
rolls CI → service. **RACI:** Zest facilitates definition + builds mapping; **business**
defines services + criticality (they own the value view); service owners confirm. **Effort:**
~10 days (estimate — the definition workshops are the cost, not the config).
