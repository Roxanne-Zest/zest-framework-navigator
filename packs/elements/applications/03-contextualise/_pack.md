---
id:        applications.03
pack_type: element
title:     "Applications → Contextualise"
version:   0.1.0
owner:     race
trust:     draft
band_from: 2
band_to:   3
unlocks:   [change-impact-assessment, incident-management, problem-management, audit-compliance-evidence]
depends_on: [applications.02, infrastructure.03]
---

The application side of the relationship map — complements `infrastructure.03`. **Boundary:**
the app↔server *hosting* edge is shared with `infrastructure.03` — **populated once**
(whichever pack discovery drives); this pack owns app↔app integrations and app↔data
dependencies.
