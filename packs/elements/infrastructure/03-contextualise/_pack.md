---
id: infrastructure.03
pack_type: element
title: "Infrastructure → Contextualise"
version: 0.1.0
owner: morgan
trust: draft
band_from: 2
band_to: 3
unlocks: [change-impact-assessment, incident-management, problem-management, alerting, configuration-drift-detection]
depends_on: [infrastructure.02, reference-data.02]
---

# Pack: Infrastructure → Contextualise · `infrastructure.03`

> ⚠️ **`trust: draft` — generated, not verified. NOT for client delivery.**
> The `review`-gated parts (Policy, Method, Process, Commercials) need a read-through.
> The `test`-gated parts (Standard schema, Build) need **executing in `zest-sandbox`** —
> run the verification checklist at the end of Build, record the result and platform
> version, then the pack can climb to `live`. Until then, treat every Freshservice
> specific below as a proposal, not a fact.

Pack: take the **Infrastructure** class from **band 2 (Manage)** to **band 3
(Contextualise)** — infrastructure CIs related to what they host, depend on and connect to,
with tickets linked, so impact, root cause and dependency become visible.

### What this pack delivers
At band 2 the estate's infrastructure is inventoried, attributed and owned — but it sits as
a flat list. This pack adds the **relationships**: each server tied to the hypervisor it runs
on, the storage and network it depends on, the location it sits in, and the workloads it
hosts. Once that map exists, a change ticket on a server can show what it affects, an
incident can be diagnosed through its dependencies, and monitoring alerts can be mapped to a
CI — none of which is possible from a list.

### Composition boundary
This pack owns the **infrastructure side** of relationships: server ↔ hypervisor, server ↔
network, server ↔ storage, CI ↔ location, and the hosting link from server up to the
application it runs. Application-internal relationships (app ↔ app, app ↔ database as a
service component) belong to `applications.03`. Service mapping (CIs up to a business
service) belongs to `services.04`. Keep the seams clean so outcome packs can compose them.

### The six parts
- **Standard** — the relationship types and the exit criteria (*what good looks like*).
- **Policy** — discovery vs manual, scope, what not to model (*the rules*).
- **Method** — the delivery sequence and RACI (*how to deliver*).
- **Build** — the Freshservice configuration + the verification checklist (*how to install*).
- **Process** — keeping the map true in BAU (*how to keep it*).
- **Commercials** — SOW, effort, acceptance, the band move (*how to scope and sell*).
