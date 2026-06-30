---
id: applications.02.standard
pack: applications.02
pack_type: element
part: standard
title: "Applications → Manage — Standard"
version: 0.1.0
owner: race
trust: draft
gate: test
band_from: 1
band_to: 2
---

**In scope:** business applications and key supporting apps (not every executable).
**Attributes:** name, **owner**, business criticality, vendor, version, status, hosting type
(on-prem / SaaS / hosted).
**Exit criteria:** every in-scope app has owner + criticality + hosting type; the list is
business-meaningful, de-duplicated.
**Proven when:** a stakeholder recognises the catalogue as "our applications", not a software
dump.
