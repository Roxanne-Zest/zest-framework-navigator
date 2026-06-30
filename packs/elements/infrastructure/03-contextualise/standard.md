---
id: infrastructure.03.standard
pack: infrastructure.03
pack_type: element
part: standard
title: "Infrastructure → Contextualise — Standard"
version: 0.1.0
owner: morgan
trust: draft
gate: test          # the relationship-type names are a Freshservice fact to verify
reviewed_by: null
tested_by: null
tested_in: null
verify_notes: ""
band_from: 2
band_to: 3
---

# Infrastructure → Contextualise — Standard

### Relationship types in scope
The minimum set of relationships an infrastructure CI must carry to reach band 3. Direction
is modelled **in the direction of impact** — the consumer/dependent points at the provider.

| From (dependent) | Relationship | To (provider) | Why it carries impact |
|---|---|---|---|
| Server / VM | *Hosted on* | Hypervisor / host | host fails → all its VMs fail |
| Application | *Runs on* / *Hosted on* | Server / VM | the hosting link — server change hits the app |
| Server | *Depends on* | Storage (LUN / datastore / share) | storage loss → server impaired |
| Server | *Connected to* | Network device (switch / firewall / LB) | network change → reachability |
| Any infra CI | *Located in* | Data centre / location | site event → everything in it |

> 🔎 **VERIFY (test-gated):** the exact relationship-type names above are Freshservice's to
> confirm — some are built-in, some may need creating as custom relationship types, and the
> precise labels differ by version. Confirm the available set in your instance and map this
> table to the real names. See Build → verification checklist items V1–V3.

### Exit criteria — band 3 is reached when
1. Every **in-scope** server/VM has, at minimum, its *Hosted on* (host) relationship **and**
   its *Runs on* link to at least one application.
2. Storage and network dependencies modelled for in-scope servers.
3. Every in-scope infrastructure CI has a *Located in* relationship.
4. **No orphan** in-scope infrastructure CIs (zero relationships).
5. Tickets (incident / change) can be associated to infrastructure CIs, and the CI's related
   items are visible from the ticket.

### Proven when
- Pick any in-scope server and see its upstream (host, storage, network, site) and
  downstream (applications it runs) within two hops.
- Raise a test change against a server → the impacted applications are visible on the change.

### Quality bar
- Relationship **direction** is consistent (impact direction, per the table).
- No duplicate or contradictory relationships between the same pair.
- Coverage measured: % of in-scope servers meeting criterion 1 (target 100% in-scope).
