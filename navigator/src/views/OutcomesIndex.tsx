// Outcomes index — entirely data-driven from the manifest. We render:
//   • outcome packs that actually exist, grouped by their `domain`; and
//   • outcomes that are *referenced* by an element pack's `unlocks` but have no
//     outcome pack yet — shown as "not yet drafted".
// We never invent the catalogue: every row here traces to a manifest field. The
// index auto-populates as outcome packs are authored (status decision #3).
import { packs, outcomePacks, packById, humanise } from "../data/manifest";
import { TrustChip, GhostChip, PageHeader } from "../components/Bits";
import type { Route } from "../lib/router";
import type { Pack } from "../data/types";

function referencedOutcomes(): { id: string; unlockedBy: string[] }[] {
  // Collect outcome ids referenced via `unlocks` (pack-level and part-level),
  // and who references them — these are real data, not a guessed catalogue.
  const map = new Map<string, Set<string>>();
  for (const p of packs) {
    const add = (ids: string[] | undefined, by: string) => {
      for (const id of ids ?? []) {
        if (!map.has(id)) map.set(id, new Set());
        map.get(id)!.add(by);
      }
    };
    add(p.unlocks, p.id);
    for (const part of p.parts) add(part.unlocks, p.id);
  }
  // Drop any that already have an outcome pack — those are "drafted", not pending.
  for (const op of outcomePacks()) map.delete(op.id);
  return [...map.entries()]
    .map(([id, by]) => ({ id, unlockedBy: [...by].sort() }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function OutcomesIndex({ navigate }: { navigate: (r: Route) => void }) {
  const drafted = outcomePacks();
  const byDomain = new Map<string, Pack[]>();
  for (const op of drafted) {
    const d = op.domain ?? "uncategorised";
    if (!byDomain.has(d)) byDomain.set(d, []);
    byDomain.get(d)!.push(op);
  }
  const domains = [...byDomain.keys()].sort();
  const pending = referencedOutcomes();

  return (
    <>
      <PageHeader
        title="Outcomes"
        sub="Business outcomes the framework composes from element packs. Drafted outcomes are grouped by domain; outcomes referenced by a pack but not yet authored are listed as not yet drafted."
      />

      {drafted.length === 0 && (
        <div className="panel muted" style={{ marginBottom: 20 }}>
          No outcome packs have been authored yet. The list below is built from the{" "}
          <code>unlocks</code> declared by element packs — it fills in as outcome packs land.
        </div>
      )}

      {domains.map((domain) => (
        <section key={domain} className="outcome-group">
          <h2 className="outcome-group__title">{humanise(domain)}</h2>
          <div className="outcome-list">
            {byDomain.get(domain)!.map((op) => (
              <button
                key={op.id}
                type="button"
                className="outcome-card"
                onClick={() => navigate({ name: "pack", id: op.id })}
              >
                <div className="outcome-card__head">
                  <span className="outcome-card__title">{op.title}</span>
                  <TrustChip trust={op.trust} />
                </div>
                {op.value ? <p className="outcome-card__value">{op.value}</p> : null}
                {op.requires?.length ? (
                  <div className="outcome-card__req">
                    Composes:{" "}
                    {op.requires.map((r, i) => (
                      <span key={r.pack}>
                        {i > 0 ? ", " : ""}
                        <code>{r.pack}</code>@{r.band}
                      </span>
                    ))}
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        </section>
      ))}

      {pending.length > 0 && (
        <section className="outcome-group">
          <h2 className="outcome-group__title">
            Referenced — not yet drafted{" "}
            <span className="outcome-group__count">{pending.length}</span>
          </h2>
          <div className="outcome-list">
            {pending.map((o) => (
              <div key={o.id} className="outcome-card outcome-card--pending">
                <div className="outcome-card__head">
                  <span className="outcome-card__title">{humanise(o.id)}</span>
                  <GhostChip>not yet drafted</GhostChip>
                </div>
                <div className="outcome-card__req">
                  Unlocked by:{" "}
                  {o.unlockedBy.map((id, i) => {
                    const exists = packById(id);
                    return (
                      <span key={id}>
                        {i > 0 ? ", " : ""}
                        {exists ? (
                          <button
                            type="button"
                            className="linklike"
                            onClick={() => navigate({ name: "pack", id })}
                          >
                            <code>{id}</code>
                          </button>
                        ) : (
                          <code>{id}</code>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
