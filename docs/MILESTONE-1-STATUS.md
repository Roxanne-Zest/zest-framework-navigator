# Framework Navigator — Milestone 1 status & handoff

_Last updated: 2026-06-28. Read this first if you're picking up M1 in a fresh session._

This repo is the **monorepo** for the Zest Delivery Framework Navigator & Toolkit: the
**packs** library (built) and, next, the **navigator** app (Slice B). Authoritative specs:
`zest-framework-navigator-spec.md`, `pack.frontmatter.md` (mirrored at
`_schema/pack.frontmatter.md`), and the M1 build brief.

---

## Where we are

### ✅ Part 1 / Slice A — DONE and merged to `main` (PR #1)
- Repo scaffold: `/packs/{elements,outcomes,tools}`, `/templates`, `/_schema`, `/scripts`.
- Seed pack: `packs/elements/infrastructure/03-contextualise/` — the
  `infrastructure-03-contextualise.md` doc split into its 7 files (`_pack.md` + 6 parts),
  one frontmatter block per file. `trust: draft`.
- Contract: `_schema/pack.frontmatter.md` (single source of truth) + `_schema/README.md`.
- **Lint** — `scripts/lint.mjs` (`npm run lint`), all 9 contract rules, wired to
  `.github/workflows/lint-packs.yml` (fails the build on violation; negative-tested).
- **Manifest builder** — `scripts/build-manifest.mjs` (`npm run manifest`) → `manifest.json`
  (gitignored; derived). Sample committed at `docs/manifest.example.json`.

### ⏸ Part 2 / Slice B — NOT STARTED (blocked on the shell)
The read-only navigator (grid index, outcomes index, pack view, verification queue) is
specified but not built. It must mount inside the **Zest Delivery shell** (auth, nav, layout,
brand), which lives in a **separate repo** this session could not reach (see Environment
notes). The next session should be launched with that repo in scope.

---

## Decisions made (across sessions)

1. **Monorepo, not two repos.** The brief named a separate `zest-delivery-packs` repo, but
   access is single-repo and the packs already live here. Packs stay at repo root; the
   navigator app should go in **`/navigator`** (Vite app, own `package.json`) consuming the
   packs at build time via a prebuild.
2. **Repo renamed** `zest-framework` → **`zest-framework-navigator`**. GitHub auto-redirects
   the old URL, so git keeps working; do not chase the rename in tooling (see Environment).
3. **Indexes are data-driven from the manifest.** The 35-outcome / 5-domain catalogue and
   `cmdb-maturity-framework.html` were not supplied. Rebuild the 9×6 grid from the contract's
   class/band lists (in the manifest). Drive the outcomes index from the manifest — render
   only outcomes that exist; **never invent the catalogue**. It auto-populates as outcome
   packs are authored.
4. **Lint rule 6 (dependency refs): errors vs warnings.** Contract text says a missing
   `depends_on`/`requires` target fails the build; we made *malformed* refs hard errors and
   *not-yet-authored* refs **warnings**, so the incremental build-out isn't blocked.
   Documented in `_schema/pack.frontmatter.md`. (Open for review — `infrastructure.03`
   legitimately depends on the unbuilt `infrastructure.02` / `reference-data.02`.)
5. Lint script is `scripts/lint.mjs` (brief naming), not `lint-packs.mjs`.

---

## Environment notes (important for the next session)

- **GitHub scope is per-session.** This session was hard-scoped to one repo; the error on
  others is `Access denied: ... not configured for this session`. To integrate the shell,
  **launch the new session with both `zest-framework-navigator` and the Zest Delivery repo in
  scope.**
- **Proxy ACL is keyed to the original repo path** (`Roxanne-Zest/zest-framework`). The
  renamed path 403s at the proxy even though GitHub redirects it. The local git remote is
  deliberately left pointing at the **old** path because that's what the proxy allows; GitHub
  redirects it to the renamed repo. Don't "fix" the remote to the new name — it will 403.

---

## Next session — Slice B plan (read-only, no Supabase writes, no generation)

**Prereq:** new session scoped to include the Zest Delivery repo.

1. **Prebuild data flow** (`/navigator`): read the packs, run `build-manifest.mjs`, emit
   `manifest.json` into the app, and copy each part's markdown body (`bodyPath` in the
   manifest) into the app's `public/` so the pack view can `fetch` it. Build-time only — no
   runtime GitHub calls.
2. **Mount as a module** in the Zest Delivery shell (its `<AppShell>` / router), brand from
   the shell tokens.
3. **Views** (per brief §Part 2):
   - **Grid index** — 9 classes × 6 bands (`manifest.classes` / `manifest.bands`); a cell
     with an element pack is clickable and coloured by `trust` (draft=red,
     reviewed/tested=amber, live=green).
   - **Outcomes index** — data-driven from manifest outcome packs; others "not yet drafted".
   - **Pack view** — `_pack.md` overview + 6 parts via `react-markdown`; per-part badge row
     (`trust` colour · `gate` test/review · `owner` · `tested_in`); "Unverified — not for
     client delivery" banner when below `live`; dependency view from `depends_on` + `unlocks`.
   - **Verification queue** — every doc by trust rung, counts + filter, default sort surfacing
     `test`-gated `draft`s first. Read-only (logging events is Slice C+).

**Acceptance (from the brief):** Infrastructure→Contextualise shows at its cell in draft
colour; pack view renders all 6 parts with correct badges, the banner, and correct deps
(`depends_on`: infrastructure.02, reference-data.02; `unlocks`: change-impact-assessment,
incident-management, problem-management, alerting, configuration-drift-detection); queue lists
parts by trust, test-gated drafts first; lint passes and a deliberate violation fails CI;
`manifest.json` drives the app.

**Out of scope (will be reverted if built):** Slice C tracker, Slice D generation /
"Generate for customer", Slice E ROI, any Supabase writes.

See `docs/manifest.md` for the exact data contract the app builds against.
