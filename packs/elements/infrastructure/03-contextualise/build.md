---
id: infrastructure.03.build
pack: infrastructure.03
pack_type: element
part: build
title: "Infrastructure → Contextualise — Build / Install"
version: 0.1.0
owner: morgan
trust: draft
gate: test            # EVERYTHING below must be proven in zest-sandbox before live
reviewed_by: null
tested_by: null
tested_in: null
verify_notes: ""
templates: [templates/infrastructure/relationship-import.csv]
band_from: 2
band_to: 3
---

# Infrastructure → Contextualise — Build / Install

> This is the highest-risk part of the pack. Every Freshservice specific below is a
> **proposal to be proven**. Work the verification checklist at the end **before** trusting
> any of it.

### What's being configured
1. The relationship **types** that realise the Standard table.
2. The **discovery** mappings that auto-populate the relationships discovery can see.
3. A **CSV import** path for the manual relationships discovery can't see.
4. (Optional) a **Workflow Automator** to keep ticket-to-CI association tidy.

### 1 · Relationship types
- Freshservice ships a set of default CI relationship types; the Standard table needs
  *Hosted on / Hosts*, *Runs on / Runs*, *Depends on / Used by*, *Connected to*, and
  *Located in / Location of* (or the client's nearest equivalents).
- Where a needed type doesn't exist, create it as a **custom relationship type** with the
  correct forward/backward labels and the impact direction from the Standard.
- *Proposed location:* **Admin → Asset Management → CI Types / Relationship Types.**
  🔎 **VERIFY V1** — exact menu path and whether custom relationship types are supported on
  the client's plan.

### 2 · Discovery mappings
- Confirm what the client's discovery source populates (VM-to-host is commonly discovered;
  storage and logical dependencies often are not).
- Map discovered attributes to the relationship types from step 1.
- Set discovered relationships to **authoritative** per Policy.
  🔎 **VERIFY V4** — that discovery actually creates the relationship (not just the CI) and
  that re-runs don't duplicate it.

### 3 · Manual relationship import
- For relationships discovery can't see, import from the agreed source using
  `templates/infrastructure/relationship-import.csv`:

```csv
source_ci_name,relationship_type,target_ci_name
APP-PAYROLL-01,Runs on,SRV-VMW-014
SRV-VMW-014,Depends on,STOR-SAN-NETAPP-02
SRV-VMW-014,Connected to,NET-CORE-SW-01
SRV-VMW-014,Located in,DC-LONDON-01
```

🔎 **VERIFY V5** — the real import format (column headers, whether relationship import is via
the asset importer or the API), and how it matches CI names vs ids.

### 4 · Ticket-to-CI association (optional WA)
- Confirm incident/change can be **associated to assets** and the associated CI's relationships
  surface on the ticket.
- *If* the client wants association nudged automatically (e.g. prompt to add the affected CI
  on a change to an infrastructure category), a simple Workflow Automator can flag it.
  🔎 **VERIFY V6** — that the *changes*/association objects expose what the WA needs (recall
  the Platform 3.0 gotchas around `args.data` shape and which events fire).

### API reference (for scripted population / validation)
Proposed calls — **all to be confirmed by curl first**, per the Zest rule "test the API
before building on it":

```bash
# List assets in scope (confirmed endpoint family: /api/v2/assets)
curl -s -u "$KEY:X" "https://$SUB.freshservice.com/api/v2/assets?per_page=100"

# 🔎 VERIFY V2 — the relationship endpoint shape is NOT assumed.
#    Confirm how relationships are read/created via the API in THIS version,
#    e.g. an associations/relationships sub-resource on an asset.
curl -s -u "$KEY:X" "https://$SUB.freshservice.com/api/v2/assets/<display_id>/relationships"   # PROVE THIS EXISTS
```

🔎 **VERIFY V3** — confirm the relationship-type **ids/names** the API expects (they may be
internal ids, not the display labels).

### Verification checklist — run in `zest-sandbox`, then promote
Record instance + platform version in `tested_in`, and outcomes in `verify_notes`.

| # | Claim to prove | How to verify | Pass? | Notes |
|---|---|---|---|---|
| V1 | Relationship types can be viewed/created at the proposed admin path | UI: Admin → Asset Management → relationship types | ☐ | |
| V2 | Relationships are readable/creatable via the API and at what path | `curl` the proposed endpoint; inspect response | ☐ | |
| V3 | The API expects type **ids** vs display labels (which?) | create one relationship via API, observe payload | ☐ | |
| V4 | Discovery creates the *relationship* (not just the CI) and is idempotent on re-run | run discovery twice; check for duplicates | ☐ | |
| V5 | The real relationship-import format (headers / importer vs API) | import the sample CSV; confirm columns + name matching | ☐ | |
| V6 | A change/incident exposes the fields a ticket-association WA would need | inspect a change's data in a WA / via API | ☐ | |
| V7 | Exit-criteria query is possible (coverage %, orphan list) | build the report/filter for "servers with no relationships" | ☐ | |

**Promotion rule:** all rows pass (or are corrected and re-drafted) → set `trust: tested`,
fill `tested_in`/`verify_notes`; owner sign-off → `trust: live`. **Every correction also
becomes a finding** routed to the owning skill (spec §4.7) so the next draft is right.
