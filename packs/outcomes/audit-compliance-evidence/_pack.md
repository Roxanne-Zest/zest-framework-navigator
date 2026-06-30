---
id:        audit-compliance-evidence
pack_type: outcome
domain:    life
title:     "Audit & compliance evidence"
version:   0.1.0
owner:     faith
trust:     draft
value:     "Turns audit from a fire drill into a report."

# --- composition: the element packs this outcome needs, @ band (auto-linked by id) ---
requires:
  - { pack: reference-data.02,    band: 2 }   # locations / sites as evidence context
  - { pack: infrastructure.02,    band: 2 }   # inventory (CE floor)
  - { pack: infrastructure.03,    band: 3 }   # relationships → config-mgmt evidence (ISO A.8.9)
  - { pack: applications.02,      band: 2 }
  - { pack: applications.03,      band: 3 }
  - { pack: end-user-devices.02,  band: 2 }   # CE scope usually includes endpoints
  - { pack: software-licences.02, band: 2 }   # patch / supported-software evidence
  - { pack: services.04,          band: 4 }   # scope evidence (ISO scoping / SOX)

benefit_model:
  metric:             "audit preparation effort (days per audit)"
  unit:               "days/audit"
  direction:          down                      # a reduction is the benefit
  value_per_unit:     null                      # £ per prep-day — set WITH the client
  baseline_method:    "days spent assembling evidence for the last audit/assessment"
  realisation_method: "days to prepare the next audit, evidence produced from the CMDB"
  cadence:            per-audit                  # typically annual; recurs every cycle
  secondary:          "reduced risk of findings / failed assessment (qualitative)"
---

### What this outcome delivers, and how it climbs
From the catalogue ladder — the outcome matures with the CMDB beneath it:

| Band | What you can evidence | Standard | Needs (from `requires`) |
|---|---|---|---|
| 2 | A current, owned inventory | Cyber Essentials | the `.02` inventory packs |
| 3 | Configuration management — real relationships | ISO 27001 A.8.9 | the `.03` relationship packs |
| 4 | Which systems are in scope | SOX / ISO scoping | `services.04` |
| 5 | Continuous, drift-checked evidence on demand | continuous assurance | + `configuration-drift-detection`, `cmdb-health-data-quality` |

**The required set scales with the target standard.** Cyber Essentials needs only the band-2
inventory packs; ISO adds the band-3 relationship packs and service scope; continuous
assurance adds the drift/health packs. The `requires` above targets a **CE + ISO 27001**
engagement — trim or extend it to the client's actual standard.

### Composition boundary
This pack owns the **evidence layer**: the reports, exports and the assembled audit pack. It
owns **none** of the underlying data — that's the required element packs. If a required pack
isn't at band, the gap is delivered as those packs first (see Method and Commercials). That's
the whole model: demand composes supply.

---
