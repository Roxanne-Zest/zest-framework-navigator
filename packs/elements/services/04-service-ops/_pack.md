---
id:        services.04
pack_type: element
title:     "Services → Service ops"
version:   0.1.0
owner:     morgan
trust:     draft
band_from: 3
band_to:   4
unlocks:   [change-impact-assessment, incident-management, status-health-pages, service-based-reporting, communications, service-level-management, experience-management-xlas, audit-compliance-evidence]
depends_on: [applications.03, infrastructure.03, reference-data.02]
---

The element pack that unlocks the most — every service-level outcome rests here. Owns the
service definitions and the service→supporting-CI mapping; consumes the relationship graph
the `.03` packs built. (Band 5 later adds the CITIS commitment + automation.)
