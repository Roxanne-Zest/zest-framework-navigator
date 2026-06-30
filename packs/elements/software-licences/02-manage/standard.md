---
id: software-licences.02.standard
pack: software-licences.02
pack_type: element
part: standard
title: "Software & licences → Manage — Standard"
version: 0.1.0
owner: race
trust: draft
gate: test
band_from: 1
band_to: 2
depends_on: [reference-data.02, applications.02]
---

**In scope:** paid / managed software and SaaS subscriptions.
**Attributes:** product, vendor, **entitlement count**, **consumed/allocated**, support
status (supported / end-of-support), version, renewal date.
**Exit criteria:** entitlement vs consumption known for in-scope software; support status
known; each licence related to the application it covers.
**Proven when:** you can show, per product, owned vs used and supported vs unsupported — the
basis of a reclaim case and a patch-evidence return.
