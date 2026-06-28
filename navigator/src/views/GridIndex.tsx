// Grid index — the 9 classes × 6 bands matrix, built straight from
// manifest.classes / manifest.bands (never hardcoded axes). A cell that has an
// element pack is clickable and coloured by that pack's trust; empty cells are
// inert placeholders. This is the framework's map.
import { classes, bands, packAtCell, humanise, bandLabel } from "../data/manifest";
import { trustMeta } from "../lib/trust";
import { PageHeader, Kicker } from "../components/Bits";
import type { Route } from "../lib/router";
import { Grid3x3 } from "lucide-react";

export function GridIndex({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <>
      <PageHeader
        title="Grid index"
        sub={`${classes.length} classes × ${bands.length} bands — the Path to Service framework. Click a populated cell to open its pack.`}
      />

      <div className="grid-wrap">
        <table className="fw-grid">
          <thead>
            <tr>
              <th className="fw-grid__corner">
                <Kicker>
                  <Grid3x3 className="lucide" /> Class ↓ / Band →
                </Kicker>
              </th>
              {bands.map((b) => (
                <th key={b} className="fw-grid__bandhead">
                  <span className="fw-grid__bandnum">{b.slice(0, 2)}</span>
                  <span className="fw-grid__bandname">{bandLabel(b)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls}>
                <th className="fw-grid__classhead" scope="row">
                  {humanise(cls)}
                </th>
                {bands.map((b) => {
                  const pack = packAtCell(cls, b);
                  if (!pack) {
                    return (
                      <td key={b} className="fw-cell fw-cell--empty" aria-hidden>
                        <span className="fw-cell__dash">·</span>
                      </td>
                    );
                  }
                  const m = trustMeta(pack.trust);
                  return (
                    <td key={b} className="fw-cell">
                      <button
                        type="button"
                        className={`fw-cell__btn tone-${m.tone}`}
                        onClick={() => navigate({ name: "pack", id: pack.id })}
                        title={`${pack.title} — trust: ${pack.trust}`}
                      >
                        <span className="fw-cell__id">{pack.id}</span>
                        <span className="fw-cell__trust">{m.label}</span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Legend />
    </>
  );
}

function Legend() {
  const items: { tone: string; label: string; note: string }[] = [
    { tone: "red", label: "Draft", note: "not client-safe" },
    { tone: "amber", label: "Reviewed", note: "not client-safe" },
    { tone: "amber-green", label: "Tested", note: "not client-safe" },
    { tone: "green", label: "Live", note: "client-safe" },
    { tone: "grey", label: "Deprecated", note: "—" },
  ];
  return (
    <div className="fw-legend">
      <span className="fw-legend__label">Trust</span>
      {items.map((it) => (
        <span key={it.tone} className="fw-legend__item">
          <span className={`fw-legend__swatch tone-${it.tone}`} />
          {it.label} <small className="muted">· {it.note}</small>
        </span>
      ))}
    </div>
  );
}
