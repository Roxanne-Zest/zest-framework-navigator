---
id: reference-data.02.standard
pack: reference-data.02
pack_type: element
part: standard
title: "Reference data → Manage — Standard"
version: 0.1.0
owner: faith
trust: draft
gate: test
band_from: 1
band_to: 2
---

**Reference sets in scope:** locations / sites / data centres; departments / teams; cost
centres; CI categories & types.
**Each set:** sourced from an authoritative system, owned, and exposed as a **lookup**
(not free text).
**Exit criteria:** every reference set populated from source; every relevant CI field uses
the lookup; zero free-text where a lookup exists.
**Proven when:** a new CI can only pick a valid location/department from the list.
🔎 VERIFY: exact mechanism (managed lookup fields vs dependent dropdowns vs asset types) — see Build.
