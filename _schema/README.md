# `_schema` — the pack contract & contribution rules

This folder holds the **contract** every pack obeys. The navigator app builds its manifest
from pack frontmatter, so the rules here are load-bearing: break them and the manifest, the
trust badges, the dependency graph and the generate gate all break with them.

- **[`pack.frontmatter.md`](./pack.frontmatter.md)** — the single source of truth for the
  frontmatter fields, the two doc shapes, the trust ladder, naming conventions, and the nine
  CI-lint rules. Read it before authoring a pack.

---

## Repo layout

```
/packs
  /elements/<class>/<NN-band>/        e.g. /infrastructure/03-contextualise/
      _pack.md  standard.md  policy.md  method.md  build.md  process.md  commercials.md
  /outcomes/<outcome-slug>/           e.g. /change-impact-assessment/
      _pack.md  + outcome-specific parts
  /tools/<tool-slug>/                 e.g. /maturity-assessment/
      _pack.md  + parts
/templates/<class-or-outcome>/        master deliverables: .docx / .xlsx / fill-defs
/_schema/                             this folder — the contract
/scripts/lint-packs.mjs               the CI lint
```

## Naming rules

- Folders are `kebab-case`.
- **Class** folders use the catalogue keys: `products`, `services`, `applications`,
  `platforms`, `infrastructure`, `cloud`, `software-licences`, `end-user-devices`,
  `reference-data`.
- **Band** folders are `NN-name` so they sort: `00-blind`, `01-account`, `02-manage`,
  `03-contextualise`, `04-service-ops`, `05-automate`.
- **Element pack id** = `<class>.<band>` → `infrastructure.03`.
- **Outcome pack id** = the catalogue slug → `change-impact-assessment`.
- **Doc id** = `<pack-id>.<part>` → `infrastructure.03.build`.
- **Part files** are named for their part: `standard.md`, `policy.md`, `method.md`,
  `build.md`, `process.md`, `commercials.md`. The pack-level doc is always `_pack.md`.

## How a doc is written

Each `.md` file starts with a YAML frontmatter block delimited by `---`, then the prose:

```markdown
---
id: infrastructure.03.build
pack: infrastructure.03
pack_type: element
part: build
title: "Infrastructure → Contextualise — Build"
version: 0.1.0
owner: morgan
trust: draft
gate: test
...
---

### What's being configured
...
```

## Contribution workflow (spec §4.5)

1. **Draft** *(Claude Code)* → `trust: draft`. A hypothesis, not a fact.
2. **Review** *(domain owner)* — read end-to-end for sense → `trust: reviewed`; set
   `reviewed_by` / `reviewed_at`.
3. **Test** *(in `zest-sandbox`)* — execute every `test`-gated claim; record
   `tested_by` / `tested_at` / `tested_in` / `verify_notes` → `trust: tested`.
4. **Sign off** *(owner)* — set `signed_off_by` / `signed_off_at` → `trust: live`. Only now
   is the pack generatable for a customer.
5. **Re-verify** on a version bump, or when Freshservice itself changes.

Every correction found in testing also becomes a **finding** routed to the owning skill
(spec §4.7), so the next draft starts corrected.

## Running the lint locally

```bash
npm install        # one-time, installs the YAML parser
npm run lint       # validates every pack doc against the contract
```

The lint **fails the build** on any contract violation (the nine rules in
`pack.frontmatter.md`). It **warns** — without failing — when a `depends_on` / `requires`
reference points at a pack that hasn't been authored yet, since the kit is built
incrementally.
