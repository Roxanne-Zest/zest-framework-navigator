# `/packs/outcomes` — outcome packs

One folder per outcome, named with the catalogue slug (e.g. `change-impact-assessment/`).
An outcome pack **composes** element packs: its `_pack.md` lists the required element packs
at their bands (`requires`) and carries the `benefit_model`, then adds only the
outcome-specific layer (reports, dashboards, workflows, comms). It does not repeat element
work.

Empty for now — the first outcome packs come after the load-bearing element packs (spec §8).
See [`/_schema/pack.frontmatter.md`](../../_schema/pack.frontmatter.md) for the outcome
`_pack.md` shape.
