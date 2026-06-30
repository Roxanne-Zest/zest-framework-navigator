---
id: applications.03.standard
pack: applications.03
pack_type: element
part: standard
title: "Applications → Contextualise — Standard"
version: 0.1.0
owner: race
trust: draft
gate: test
band_from: 2
band_to: 3
depends_on: [applications.02, infrastructure.03]
---

**Relationships (impact direction):** application *Runs on* server/VM (shared edge); application
*Depends on* database / data store; application *Sends data to / Receives from* application
(integrations that carry impact).
**Exit criteria:** every in-scope app related to its hosting + its critical data + its
material integrations; no orphan apps.
**Proven when:** a change on an app shows the infrastructure beneath it and the apps it feeds.
🔎 VERIFY relationship-type names against the instance (as `infrastructure.03` V1–V3).
