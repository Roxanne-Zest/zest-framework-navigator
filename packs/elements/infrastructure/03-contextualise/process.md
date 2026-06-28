---
id: infrastructure.03.process
pack: infrastructure.03
pack_type: element
part: process
title: "Infrastructure → Contextualise — Process"
version: 0.1.0
owner: morgan
trust: draft
gate: review
reviewed_by: null
band_from: 2
band_to: 3
---

# Infrastructure → Contextualise — Process

### Keeping the map true (or it rots)
- **Discovered relationships** — set the discovery refresh cadence (e.g. daily/weekly per the
  client's change rate). The map self-heals for whatever discovery covers.
- **Manual relationships** — maintained **through the change process**: building, moving or
  decommissioning an in-scope server includes updating its relationships as a step. A
  decommission removes the CI's relationships so nothing dangles.
- **Orphan audit** — a scheduled check lists in-scope infrastructure CIs with zero
  relationships; the owner clears them. This is the band-3 slice of the *CMDB health* outcome.

### Triggers
| Event | Action |
|---|---|
| New server built (change) | add *Hosted on*, *Runs on*, storage/network, *Located in* |
| Server moved / re-platformed | update host, storage, network, location relationships |
| Server decommissioned (change) | remove the CI's relationships |
| Discovery refresh | discovered relationships reconciled automatically |
| Monthly | orphan audit; coverage % reviewed by the owner |

### Owner
Infrastructure / platform team lead. Coverage % and orphan count are the two BAU health
metrics for this pack.
