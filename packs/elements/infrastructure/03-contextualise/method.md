---
id: infrastructure.03.method
pack: infrastructure.03
pack_type: element
part: method
title: "Infrastructure → Contextualise — Method"
version: 0.1.0
owner: morgan
trust: draft
gate: review
reviewed_by: null
effort_days: 6        # ESTIMATE — calibrate against real delivery (see Commercials)
band_from: 2
band_to: 3
depends_on: [infrastructure.02, reference-data.02]
---

# Infrastructure → Contextualise — Method

### Prerequisites (the diagonal dependencies)
- **`infrastructure.02` complete** — you cannot relate what you have not catalogued,
  attributed and owned. If the band-2 baseline is thin, stop and close it first.
- **`reference-data.02`** — locations / data centres exist as reference data to relate to.

### Delivery sequence
1. **Confirm the band-2 baseline** — inventory complete for in-scope infrastructure, owners
   set, key attributes populated. Gate: don't proceed until true.
2. **Map the relationship types needed** to the real Freshservice types (Build V1–V3).
3. **Decide discovery vs manual per relationship type** (Policy → Federation) and confirm
   what the client's discovery source actually covers.
4. **Configure** any missing relationship types and discovery mappings (Build).
5. **Populate** — run discovery and/or import the manual relationships from the agreed
   source (Build provides the import shape).
6. **Validate** against the Standard exit criteria; measure coverage; fix orphans.
7. **Link tickets** — confirm incident/change association to CIs works and is visible.

### RACI
- **Consultant (Zest):** configures relationship types and discovery mappings; provides the
  import templates; runs validation; coaches the team. *Responsible.*
- **Client infrastructure team:** confirms the truth of relationships (they know what runs
  where), provides the storage/network source data, validates. *Accountable for accuracy.*
- **Service owner / sponsor:** confirms scope and criticality order. *Consulted.*

### Effort
Estimate **6 days** for a mid-size estate **with a working discovery source**; materially
more if relationships are largely manual or the estate is large. This number is an estimate —
log actuals and calibrate (Commercials).
