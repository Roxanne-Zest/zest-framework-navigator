# Pack contract — `_schema/pack.frontmatter.md`

The single source of truth for what every pack doc must declare. The navigator builds its
manifest from this frontmatter, so these fields drive the grid index, the trust badges, the
dependency graph, the verification queue and the generate gate.

This file is itself version-controlled. Changing the contract is a `major` event for the
whole library.

---

## Two doc shapes

Every markdown file in `/packs` is one of two shapes.

### A. Part-level doc

One per part of a pack: `standard.md`, `policy.md`, `method.md`, `build.md`, `process.md`,
`commercials.md`.

```yaml
id:            infrastructure.03.build      # <pack>.<part> — globally unique
pack:          infrastructure.03            # the pack this part belongs to
pack_type:     element                      # element | outcome | tool
part:          build                        # standard|policy|method|build|process|commercials
title:         "Infrastructure → Contextualise — Build"
version:       0.1.0                         # semver; a minor/major bump drops trust
owner:         morgan                        # accountable person

# --- trust & verification (governed by spec §4) ---
trust:         draft                         # draft | reviewed | tested | live | deprecated
gate:          test                          # test | review — how THIS part is verified
reviewed_by:   null
reviewed_at:   null
tested_by:     null
tested_at:     null
tested_in:     null                          # "<instance> · <platform version>" when tested
signed_off_by: null
signed_off_at: null
verify_notes:  ""                            # what was checked; caveats; known gaps

# --- delivery metadata ---
effort_days:   null                          # estimate; calibrated against real delivery
band_from:     2                             # element packs only
band_to:       3                             # element packs only
unlocks:       []                            # outcome ids this part/pack enables
depends_on:    []                            # prerequisite pack ids (the diagonal deps)
templates:     []                            # master template files this part hands over
```

### B. Pack-level doc — `_pack.md`

One per pack folder. The overview + the metadata the parts share.

```yaml
id:        infrastructure.03
pack_type: element
title:     "Infrastructure → Contextualise"
version:   0.1.0
owner:     morgan
trust:     draft            # = the LOWEST trust of its parts (a pack is only as trusted as its weakest part)
band_from: 2
band_to:   3
unlocks:   [change-impact-assessment, incident-management, problem-management, alerting]
depends_on:[infrastructure.02, reference-data.02]
```

For an **outcome** `_pack.md`, add the composition and the benefit model:

```yaml
pack_type: outcome
domain:    svc
value:     "The difference between a safe change and an outage."
requires:                                    # element packs @ band this outcome composes
  - { pack: infrastructure.03, band: 3 }
  - { pack: applications.03,   band: 3 }
  - { pack: services.04,       band: 4 }
benefit_model:
  metric:             "change-related incidents per month"
  unit:               "incidents/mo"
  direction:          down                    # down = a reduction is the benefit
  value_per_unit:     null                    # £ per unit/mo — set WITH the client at start
  baseline_method:    "12-week pre-engagement rate, tagged change-related"
  realisation_method: "rolling 12-week post rate, same tag"
  cadence:            monthly
```

---

## Field reference

| Field | Type | Required | Allowed / format | Notes |
|---|---|---|---|---|
| `id` | string | yes | `<pack>.<part>` or `<pack>` | globally unique; joins repo to Supabase |
| `pack` | string | part docs | `<class>.<band>` or `<outcome-slug>` | the owning pack |
| `pack_type` | enum | yes | `element` `outcome` `tool` | |
| `part` | enum | part docs | the six part names | |
| `title` | string | yes | — | human title |
| `version` | semver | yes | `MAJOR.MINOR.PATCH` | mirrored by a git tag |
| `owner` | string | yes | team slug | accountable person |
| `trust` | enum | yes | `draft` `reviewed` `tested` `live` `deprecated` | current rung (spec §4.2) |
| `gate` | enum | part docs | `test` `review` | how this part is proven (spec §4.3) |
| `reviewed_by` / `_at` | string / date | when reviewed | — | |
| `tested_by` / `_at` | string / date | when tested | — | |
| `tested_in` | string | when tested | `"<instance> · <platform version>"` | the freshness anchor |
| `signed_off_by` / `_at` | string / date | when live | — | gates promotion to `live` |
| `verify_notes` | string | no | — | what was checked; caveats |
| `effort_days` | number | no | days | estimate; feeds ROI cost baseline |
| `band_from` / `band_to` | int | element packs | 0–5 | the climb this pack delivers |
| `unlocks` | list | no | outcome ids | what this enables |
| `depends_on` | list | no | pack ids | prerequisites — must exist first |
| `requires` | list | outcome packs | `{pack, band}` | element packs this outcome composes |
| `benefit_model` | object | outcome packs | see shape above | feeds ROI |
| `templates` | list | no | file paths | master deliverables handed over |

---

## Trust & gate — quick reference

- **Trust ladder:** `draft` → `reviewed` → `tested` → `live`. Only `live` is client-safe and
  generatable. (Full rules: spec §4.2–4.4.)
- **Gate per part:**
  - `test` — **Build/Install**, and the schema portion of **Standard**. Must be *executed* in
    a sandbox. High hallucination risk.
  - `review` — **Policy, Method, Process, Commercials**. Human judgement; no execution.
- A pack reaches `live` only when its `test`-gated parts are `tested`, its `review`-gated
  parts are `reviewed`, and the owner has signed off.

---

## Naming conventions

- Folders: `kebab-case`.
- Class folders use the catalogue keys: `products`, `services`, `applications`, `platforms`,
  `infrastructure`, `cloud`, `software-licences`, `end-user-devices`, `reference-data`.
- Band folders: `NN-name` so they sort — `00-blind`, `01-account`, `02-manage`,
  `03-contextualise`, `04-service-ops`, `05-automate`.
- Element pack id: `<class>.<band>` → `infrastructure.03`.
- Outcome pack id: the catalogue slug → `change-impact-assessment`.
- Doc id: `<pack-id>.<part>` → `infrastructure.03.build`.
- Customer slug (in `tested_on` / engagements): lowercase, stable → `brunel`, `ekco`.

```
/packs
  /elements/<class>/<NN-band>/
      _pack.md  standard.md  policy.md  method.md  build.md  process.md  commercials.md
  /outcomes/<outcome-slug>/
      _pack.md  + outcome-specific parts (shared parts reference element packs)
  /tools/<tool-slug>/
/templates/<class-or-outcome>/      master .docx / .xlsx
/_schema/pack.frontmatter.md         ← this file
```

---

## CI lint (enforced on push)

The lint fails the build if any of these are false. It keeps the manifest trustworthy.

1. Every `.md` under `/packs` has valid frontmatter parseable to this contract.
2. `id`, `pack_type`, `title`, `version`, `owner`, `trust` present on every doc.
3. Part docs carry a `gate`; pack docs do not.
4. `version` is valid semver.
5. `trust` and `gate` use only allowed values.
6. `depends_on` / `requires` reference pack ids that exist in the repo.
7. Folder path matches the declared `pack` / `part` / `band`.
8. A doc at `trust: live` has `signed_off_by`, `signed_off_at`, and — if `gate: test` —
   `tested_by`, `tested_at`, `tested_in`.
9. A pack's `_pack.md` `trust` is not higher than the minimum `trust` of its parts.

> **Note on rule 6 during build-out.** The kit is built incrementally (spec §8): one pack at
> a time, the rest drafted on demand. So a `depends_on` / `requires` reference to a pack that
> doesn't exist *yet* is reported as a **warning**, not a hard failure — a *malformed*
> reference (wrong id shape) is a hard failure. This keeps the lint usable while the library
> grows without letting typos through. The lint exits non-zero only on errors.
