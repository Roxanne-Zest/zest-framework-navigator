---
id: end-user-devices.02.process
pack: end-user-devices.02
pack_type: element
part: process
title: "End-user devices → Manage — Process"
version: 0.1.0
owner: race
trust: draft
gate: review
band_from: 1
band_to: 2
---

MDM sync on a cadence keeps the inventory live. **JML drives assignment** — a joiner's device
is assigned, a leaver's is returned/wiped and reassigned (links to the JML outcome). Monthly:
unassigned + missing-encryption check (the health metric, and a direct CE control).
