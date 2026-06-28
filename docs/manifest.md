# `manifest.json` — the navigator's data contract

`scripts/build-manifest.mjs` (`npm run manifest`) reads every pack doc under `/packs` and
emits `manifest.json` at the repo root. This file is the **single data source** for the
read-only navigator. It is a derived artifact (gitignored); a committed sample lives at
[`manifest.example.json`](./manifest.example.json).

## Top-level shape

```jsonc
{
  "generatedAt": "2026-06-28T14:40:26.929Z",   // ISO build timestamp
  "classes": ["products", "services", ...],      // 9 class keys, grid X axis order
  "bands":   ["00-blind", "01-account", ...],    // 6 band slugs, grid Y axis order
  "packs":   [ /* Pack[] */ ]                     // every pack with its parts, see below
}
```

`classes` and `bands` are the canonical orderings from the contract — **build the 9×6 grid
straight from them**, don't hardcode axes in the app.

## `Pack` record

Every field from the pack's `_pack.md` frontmatter, plus `bodyPath` and `parts`:

```jsonc
{
  "id": "infrastructure.03",         // <class>.<band> (element) | <slug> (outcome/tool)
  "pack_type": "element",            // element | outcome | tool
  "title": "Infrastructure → Contextualise",
  "version": "0.1.0",
  "owner": "morgan",
  "trust": "draft",                  // draft | reviewed | tested | live | deprecated
  "band_from": 2,
  "band_to": 3,                      // for elements, band_to maps to the grid band
  "unlocks": ["change-impact-assessment", ...],
  "depends_on": ["infrastructure.02", "reference-data.02"],
  "bodyPath": "packs/elements/infrastructure/03-contextualise/_pack.md",
  "parts": [ /* Part[], ordered standard→policy→method→build→process→commercials */ ]
}
```

Outcome packs additionally carry `domain`, `value`, `requires` (`[{pack, band}]`) and
`benefit_model` — see `_schema/pack.frontmatter.md`.

## `Part` record

Every field from the part doc's frontmatter, plus `bodyPath`:

```jsonc
{
  "id": "infrastructure.03.build",
  "pack": "infrastructure.03",
  "part": "build",                   // standard|policy|method|build|process|commercials
  "title": "Infrastructure → Contextualise — Build / Install",
  "version": "0.1.0",
  "owner": "morgan",
  "trust": "draft",
  "gate": "test",                    // test | review
  "tested_in": null,                 // "<instance> · <platform version>" when tested
  "bodyPath": "packs/elements/infrastructure/03-contextualise/build.md"
  // ...reviewed_by/at, tested_by/at, signed_off_by/at, verify_notes, effort_days, templates
}
```

## How the app uses it

- **Grid index** — for each `classes[x] × bands[y]`, find the element pack whose class matches
  `classes[x]` and whose band number matches `bands[y]` (band slug `NN-…` ↔ pack id
  `<class>.NN`). Colour the cell by that pack's `trust`.
- **Outcomes index** — list `packs` where `pack_type === "outcome"`, grouped by `domain`.
  Outcomes with no pack render "not yet drafted" (do not invent them).
- **Pack view** — render the pack's `_pack.md` body (`bodyPath`), then each `parts[]` body via
  `react-markdown`; badge row from `trust`/`gate`/`owner`/`tested_in`; banner when
  `trust !== "live"`; dependency view from `depends_on` + `unlocks`.
- **Verification queue** — flatten all packs' `parts`; group/sort by `trust`; default sort puts
  `gate === "test" && trust === "draft"` first.

### Body fetch

`bodyPath` is repo-relative. The prebuild copies these markdown files into the app's `public/`
(e.g. `public/<bodyPath>`), and the pack view fetches them at view time — **build-time data,
no runtime GitHub API** (avoids rate limits, works offline).

## Trust → colour (single source for the UI)

| trust | colour | client-safe |
|---|---|---|
| `draft` | red | no |
| `reviewed` | amber | no |
| `tested` | amber (amber-green) | no |
| `live` | green | **yes** |
| `deprecated` | grey | no |

Brand tokens (cream/ink/lemon/lime/pomelo/orange) are in the blueprint and the Zest Delivery
shell — use the shell's once integrated.
