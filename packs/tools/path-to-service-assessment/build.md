---
id: path-to-service-assessment.build
pack: path-to-service-assessment
pack_type: tool
part: build
title: "Assessment build — the instrument"
version: 0.1.0
owner: roxanne
trust: draft
gate: test
verify_notes: "Instance-inspection steps name Admin screens and API endpoints — verify against the current Freshservice release in a sandbox before first client use, and record instance + version in tested_in."
---

# Build — the instrument

Two components: the indicator bank (score with it) and the instance-inspection checklist (evidence with it).

## Reading the bank
Per class, per band transition: Ask (interview lens) · Inspect (instance lens) · Pass (what earns a 2). Bands 4–5 carry single probes only in v0.1 — they deepen as real engagements reach them.

### reference-data
| Band | Ask | Inspect | Pass |
|---|---|---|---|
| →1 | Where do the lists of locations, departments, vendors live? | Admin: locations, departments, vendor records populated ⚠️ | Lists exist in Freshservice, not only in a spreadsheet |
| →2 | Who owns them; how does a new site get added? | Named owner; recent updates visible; sample 20 assets for valid location + department | ≥90% of sample resolve to a real reference value |
| →3 | Are the same values used everywhere? | Cross-class sample: tickets, assets, users share one location/department set | No duplicate or free-text shadow lists in active use |
| 4/5 | — | Reference changes flow from an authoritative source (HR/facilities feed)? | Automated or single-touch update path |

### infrastructure
| Band | Ask | Inspect | Pass |
|---|---|---|---|
| →1 | Name five business-critical servers. | Are all five in the CMDB as the right asset type? | 5/5 present, correctly typed |
| →2 | Who owns them; what happens at decommission? | Sample 20: owner, environment, status, lifecycle populated; one known-decommissioned item marked as such | ≥80% completeness; status reflects reality |
| →3 | What runs on this host? | Sample 10 applications: hosting relationships resolve to real hosts; one relationship model in use | ≥8/10 resolve |
| 4/5 | — | Incident/change surfaces impacted infra automatically; discovery keeps records true | In use, not merely configured |

### applications
| Band | Ask | Inspect | Pass |
|---|---|---|---|
| →1 | Is there an application list? | Application asset type in use; count plausible against interview | List exists in-instance |
| →2 | Who owns app X, business and technical? | Sample 20: business owner, technical owner, criticality, environment | ≥80% completeness; owners are current employees |
| →3 | What breaks if host Y reboots? | App→infra and app→app edges; walk two known integrations | Both walks resolve in the map |
| 4/5 | — | Change impact auto-lists dependents; unmapped installs get flagged | Demonstrated live |

### services
| Band | Ask | Inspect | Pass |
|---|---|---|---|
| →1 | What services does IT offer, by name? | Business service records or equivalent exist | Named service list in-instance |
| →2 | Who owns service Z; what is its commitment? | Owner plus support hours / priority mapping recorded per service | Recorded for services covering ≥80% of ticket volume |
| →3 | Which applications deliver service Z? | Service→app relationships for the top 5 services | 5/5 mapped |
| →4 | When a host dies, which services show impacted? | Incident on a mapped host shows service impact; ticket categorisation aligned to services | Demonstrated end-to-end on one real chain |

### products
| Band | Ask | Inspect | Pass |
|---|---|---|---|
| →1 | What does IT offer internally, as products? | Product/offer records or catalogue structure exists | Enumerated in-instance |
| →2 | Owner and lifecycle per product? | Sample: owner and status fields populated | ≥80% owned |
| →3 | What services compose product P? | Walk one product to its services | Resolves |

### platforms
| Band | Ask | Inspect | Pass |
|---|---|---|---|
| →1 | Which shared platforms exist (M365, Salesforce, …)? | Represented as assets of a platform type | Enumerated |
| →2 | Platform owner and support model? | Sample: owner and support route recorded | Owned and routed |
| →3 | What depends on platform P? | Platform→app/service edges for the top 3 platforms | 3/3 have dependents mapped |

### cloud
| Band | Ask | Inspect | Pass |
|---|---|---|---|
| →1 | List the cloud accounts and subscriptions. | Accounts represented; count matches billing | All billed accounts present |
| →2 | Owner and tagging per account? | Sample: owner, cost centre / tag fields | ≥90% owned — it is money |
| →3 | Which application runs in account A? | Account/resource→app relationships | Top accounts resolve |

### software-licences
| Band | Ask | Inspect | Pass |
|---|---|---|---|
| →1 | What licences do we hold? | Entitlements recorded as contracts or software assets | Entitlement list in-instance |
| →2 | Entitlement vs consumption; renewals? | Sample 10 titles: seats owned vs assigned; renewal dates present | ≥8/10 reconcile; renewals dated |
| →3 | Which application does licence L cover? | Walk 5 titles to application records | 5/5 linked |
| 4/5 | — | True-up or harvesting runs on a cadence from live data | Evidence of the last run |

### end-user-devices
| Band | Ask | Inspect | Pass |
|---|---|---|---|
| →1 | How many devices do we have? | CMDB count vs MDM/directory count | Delta ≤10% and explained |
| →2 | Assigned to whom; what happens at leaving? | Sample 20 leavers from last quarter: device status | ≥80% show returned, wiped or disposed correctly |
| →3 | Thin by design — device→person is band 2 | Score only if device criticality is genuinely modelled | n/a by default |

## Instance-inspection checklist — evidence capture
⚠️ Screen paths and endpoints are release-dependent. Verify in a sandbox before first client use; record instance and version in tested_in when this part is verified.
1. Asset types in use vs the nine classes — which classes have a home at all
2. Relationship types defined vs actually used — defined-but-empty is a finding
3. Field completeness per class via list-view export or API (api/v2/assets with type fields included) 🔎
4. Automation surface — discovery probe/agent status; integrations feeding the CMDB
5. Ticket linkage — % of the last 100 incidents carrying an asset or service association
6. Reference sets — locations, departments, vendors: counts and last-modified

## Sampling protocol
Export or API-pull the class list; take every Nth record to reach 20; score the fields; keep the id list with the findings log. Same protocol every class, every engagement — comparability is the point.
