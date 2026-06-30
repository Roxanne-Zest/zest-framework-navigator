---
id: end-user-devices.02.policy
pack: end-user-devices.02
pack_type: element
part: policy
title: "End-user devices → Manage — Policy"
version: 0.1.0
owner: race
trust: draft
gate: review
band_from: 1
band_to: 2
---

- **Source:** the MDM / endpoint-management tool (Intune, Jamf, etc.) is authoritative —
  the CMDB mirrors it, not the other way round.
- **Scope:** corporate-managed devices; BYOD only if in the security scope.
- **Ownership:** assigned user + IT; an unassigned managed device is an exception to clear.
