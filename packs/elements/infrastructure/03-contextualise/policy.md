---
id: infrastructure.03.policy
pack: infrastructure.03
pack_type: element
part: policy
title: "Infrastructure → Contextualise — Policy"
version: 0.1.0
owner: morgan
trust: draft
gate: review
reviewed_by: null
band_from: 2
band_to: 3
---

# Infrastructure → Contextualise — Policy

### Federation — what's authoritative
- Where a **discovery** source covers a relationship (e.g. a discovery probe that sees
  VM-to-host, or server-to-network), **discovery is authoritative** and the relationship is
  maintained automatically. Do not hand-maintain what discovery can populate — manual edits
  to discovered relationships will be overwritten and waste effort.
- Where discovery does **not** reach (often storage mappings, logical dependencies, location),
  relationships are **manual / imported** and owned by the infrastructure team.
- Record, per relationship type, which source is authoritative. This decision is made once,
  in delivery, and written here for the client.

### Scope — what's in
- **Production first.** Non-production modelled only where it shares infrastructure with
  production or supports a critical service.
- **Critical services' infrastructure first** — sequence by service criticality, not by data
  centre or alphabet.
- Out of scope at band 3: end-user devices (their own class), deep application-internal
  topology (`applications.03`), and full service mapping (`services.04`).

### What NOT to model (the LSM discipline)
Only model relationships that **carry impact or risk**. Resist mapping every cable and every
incidental connection — a relationship that never changes a decision is noise that rots.
If a relationship wouldn't change an impact assessment, a diagnosis or a risk view, leave it
out.

### Ownership
- Infrastructure CIs and their relationships are owned by the infrastructure / platform team.
- Relationship **accuracy** is the owner's responsibility; the BAU process (see Process)
  defines how they keep it true.
