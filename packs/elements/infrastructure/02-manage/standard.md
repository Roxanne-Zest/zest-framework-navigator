---
id: infrastructure.02.standard
pack: infrastructure.02
pack_type: element
part: standard
title: "Infrastructure → Manage — Standard"
version: 0.1.0
owner: morgan
trust: draft
gate: test
band_from: 1
band_to: 2
depends_on: [reference-data.02]
---

**Classes:** servers (physical/virtual), network devices, storage, hypervisors.
**Mandatory attributes:** name, type, status, **owner**, **location** (ref-data lookup), key
spec, lifecycle/EOL dates where known.
**Exit criteria:** every in-scope infra CI carries the mandatory attributes + an owner; no
"unknown" owners or locations.
**Proven when:** you can report the whole in-scope estate with owner and location, no blanks.
