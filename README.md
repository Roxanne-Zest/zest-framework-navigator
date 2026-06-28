# Zest Delivery — Pack Library

The off-the-shelf delivery kit behind the **Framework Navigator & Toolkit**. Every element
and outcome in the Path to Service framework is wrapped in a six-part **Delivery Pack**
(Standard · Policy · Method · Build · Process · Commercials), stored here as version-
controlled markdown. The navigator app reads these packs through a manifest built from their
frontmatter to drive the grid index, trust badges, dependency graph, verification queue and
the generate gate.

> **Status — Slice A.** This repo is the *packs* layer (one of three: app, packs, state). It
> currently holds the pack **contract**, the **CI lint**, and **one fully-worked element
> pack** (`infrastructure.03`) at `trust: draft` — the clonable template and the proof of the
> verification loop. The navigator app and Supabase state live elsewhere.

## Layout

```
/packs
  /elements/<class>/<NN-band>/   six-part element packs   (e.g. infrastructure/03-contextualise)
  /outcomes/<outcome-slug>/      outcome packs (compose elements + benefit model)
  /tools/<tool-slug>/            tool packs
/templates/<class-or-outcome>/   master deliverables (.docx / .xlsx / .csv fill-defs)
/_schema/                        the pack contract — read this first
/scripts/lint-packs.mjs          the CI lint that enforces the contract
```

## The contract

Every pack doc carries YAML frontmatter that the app reads. The single source of truth for
those fields — the two doc shapes, the trust ladder, naming conventions and the nine lint
rules — is **[`_schema/pack.frontmatter.md`](./_schema/pack.frontmatter.md)**. See
[`_schema/README.md`](./_schema/README.md) for the contribution workflow.

## Trust ladder (spec §4)

`draft` → `reviewed` → `tested` → `live`. **Only `live` is client-safe and generatable.**
Nothing is trusted on generation: `test`-gated parts (Build, and the schema in Standard) must
be *executed* in `zest-sandbox`; `review`-gated parts (Policy, Method, Process, Commercials)
need a human read-through. A pack reaches `live` only when its parts clear their gates and the
owner signs off.

## Develop

```bash
npm install     # installs the YAML parser the lint uses
npm run lint    # validates every pack doc against the contract
```

The lint **fails** on any contract violation and **warns** (without failing) when a
dependency points at a pack not yet authored — the kit is built incrementally.
