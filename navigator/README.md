# Framework Navigator (app)

The **read-only navigator** over the Zest Delivery pack library — Milestone 1, Slice B.
A React + Vite app that reads the packs through `manifest.json` (built by Slice A's
`scripts/build-manifest.mjs`) and presents four views over them. It mounts as a module inside
the **Zest Delivery shell**, reusing its auth, nav, layout and brand.

> **Read-only by design.** No Supabase writes, no "Generate for customer", no tracker/ROI.
> Nothing below `live` trust is shown as client-ready. Generation and logging are later slices.

## The four views

1. **Grid index** — the 9 classes × 6 bands matrix, built straight from `manifest.classes` /
   `manifest.bands`. A cell with an element pack is clickable and coloured by `trust`
   (draft = red, reviewed/tested = amber, live = green).
2. **Outcomes** — data-driven from the manifest: outcome packs grouped by `domain`, plus
   outcomes referenced via `unlocks` but not yet authored, shown as *not yet drafted*. The
   catalogue is never invented — every row traces to a manifest field.
3. **Pack view** — the `_pack.md` overview and the six parts via `react-markdown`, each with a
   badge row (`trust` · `gate` · `owner` · `tested_in`), the **"Unverified — not for client
   delivery"** banner when below `live`, and a dependency view from `depends_on` + `unlocks`.
4. **Verification queue** — every part by trust rung, with counts and a filter. The default
   sort surfaces `gate: test` + `trust: draft` parts first.

## Data flow (build-time only)

```
/packs ──► scripts/build-manifest.mjs ──► manifest.json
                                            │
              navigator/scripts/prebuild.mjs│  (npm run prebuild:data)
                                            ▼
       src/generated/manifest.json   (imported for the index data)
       public/<bodyPath>/*.md         (fetched by the pack view at view time)
```

`npm run prebuild:data` runs the manifest builder, vendors the manifest into the app, and
copies every pack/part markdown body into `public/`. **No runtime GitHub or API calls** — the
navigator works entirely from baked-in build-time data (offline, no rate limits). The
generated files are git-ignored; they are rebuilt on every `dev` / `build`.

## Develop

```bash
npm install
npm run dev        # predev runs the data prebuild, then Vite on :5174
npm run build      # prebuild + tsc + vite build → dist/
npm run typecheck
```

The prebuild reads the packs from the repo root (`../packs`) and needs the root's `js-yaml`;
if the root deps aren't installed it installs them once automatically.

## Mounting in the Zest Delivery shell

The shell adds a **Framework** item to its sidebar (`DashSidebar`) and a `framework` view
(`src/features/navigator/FrameworkModule.tsx`) that mounts this app — in **embed mode**
(`?embed=1`, which drops the navigator's own sidebar so the host shell is the only chrome) —
inside the authenticated `.zest-dash` layout. Point the shell at a deployed build with
`VITE_NAVIGATOR_URL` (defaults to `/navigator/`).
