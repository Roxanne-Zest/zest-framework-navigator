---
id: end-user-devices.02.standard
pack: end-user-devices.02
pack_type: element
part: standard
title: "End-user devices → Manage — Standard"
version: 0.1.0
owner: race
trust: draft
gate: test
band_from: 1
band_to: 2
---

**In scope:** corporate-managed laptops, desktops, mobiles (and tablets where issued).
**Attributes:** name, type, **assigned user**, status, OS + version, **encryption state**,
location (ref-data lookup).
**Exit criteria:** every in-scope device assigned to a user with OS/version and encryption
state recorded; no unassigned managed devices.
**Proven when:** you can report every endpoint with its user, OS and encryption — the core of
a Cyber Essentials device return.
