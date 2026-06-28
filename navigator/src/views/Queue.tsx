// Verification queue — every part across every pack, by trust rung, with counts
// and a filter. The default sort surfaces the riskiest work first: test-gated
// drafts (high hallucination risk, unverified) lead, then the rest climb the
// trust ladder. Read-only — logging verification events is Slice C+, out of
// scope here.
import { useMemo, useState } from "react";
import { FlaskConical, Eye } from "lucide-react";
import { allParts, packById, humanise } from "../data/manifest";
import { trustMeta, TRUST_ORDER } from "../lib/trust";
import { TrustChip, PageHeader } from "../components/Bits";
import type { Part, Trust } from "../data/types";
import type { Route } from "../lib/router";

const PART_ORDER = ["standard", "policy", "method", "build", "process", "commercials"];

function isTestGatedDraft(p: Part): boolean {
  return p.gate === "test" && p.trust === "draft";
}

// Lower sorts first. Deprecated (rung -1) is pushed to the very end.
function rungSortKey(trust: Trust): number {
  const r = trustMeta(trust).rung;
  return r < 0 ? 99 : r;
}

function compare(a: Part, b: Part): number {
  // 1. Test-gated drafts first — the queue's whole point.
  const ad = isTestGatedDraft(a) ? 0 : 1;
  const bd = isTestGatedDraft(b) ? 0 : 1;
  if (ad !== bd) return ad - bd;
  // 2. Then up the trust ladder, least-verified first.
  const ar = rungSortKey(a.trust);
  const br = rungSortKey(b.trust);
  if (ar !== br) return ar - br;
  // 3. Test gate before review within a rung.
  if (a.gate !== b.gate) return a.gate === "test" ? -1 : 1;
  // 4. Stable by pack then part.
  if (a.pack !== b.pack) return a.pack.localeCompare(b.pack);
  return PART_ORDER.indexOf(a.part) - PART_ORDER.indexOf(b.part);
}

export function Queue({ navigate }: { navigate: (r: Route) => void }) {
  const parts = useMemo(() => allParts().slice().sort(compare), []);
  const [trustFilter, setTrustFilter] = useState<Trust | "all">("all");
  const [testOnly, setTestOnly] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const p of parts) c[p.trust] = (c[p.trust] ?? 0) + 1;
    return c;
  }, [parts]);

  const testGatedDrafts = parts.filter(isTestGatedDraft).length;

  const shown = parts.filter(
    (p) =>
      (trustFilter === "all" || p.trust === trustFilter) &&
      (!testOnly || p.gate === "test"),
  );

  return (
    <>
      <PageHeader
        title="Verification queue"
        sub="Every part by trust rung. Test-gated drafts are surfaced first — they carry the highest risk and must be executed in a sandbox before the pack can climb."
      />

      <div className="queue-filters">
        <button
          type="button"
          className={`fchip${trustFilter === "all" ? " is-active" : ""}`}
          onClick={() => setTrustFilter("all")}
        >
          All <span className="fchip__n">{parts.length}</span>
        </button>
        {TRUST_ORDER.map((t) => {
          const n = counts[t] ?? 0;
          if (n === 0) return null;
          const m = trustMeta(t);
          return (
            <button
              key={t}
              type="button"
              className={`fchip tone-${m.tone}${trustFilter === t ? " is-active" : ""}`}
              onClick={() => setTrustFilter(t)}
            >
              {m.label} <span className="fchip__n">{n}</span>
            </button>
          );
        })}
        <span className="queue-filters__spacer" />
        <button
          type="button"
          className={`fchip${testOnly ? " is-active" : ""}`}
          onClick={() => setTestOnly((v) => !v)}
          title="Show only test-gated parts (executed in a sandbox)"
        >
          <FlaskConical className="lucide" /> Test-gated only
        </button>
      </div>

      {testGatedDrafts > 0 && trustFilter === "all" && !testOnly && (
        <p className="queue-lead muted small">
          <FlaskConical className="lucide inline" />{" "}
          <strong>{testGatedDrafts}</strong> test-gated draft part(s) need executing first —
          they lead the list below.
        </p>
      )}

      <div className="queue-table-wrap">
        <table className="queue-table">
          <thead>
            <tr>
              <th>Part</th>
              <th>Pack</th>
              <th>Trust</th>
              <th>Gate</th>
              <th>Owner</th>
              <th>Tested in</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((p) => {
              const pk = packById(p.pack);
              return (
                <tr
                  key={p.id}
                  className={isTestGatedDraft(p) ? "queue-row--priority" : undefined}
                  onClick={() => navigate({ name: "pack", id: p.pack })}
                  title={`Open ${p.pack}`}
                >
                  <td>
                    <span className="queue-part">{humanise(p.part)}</span>
                    <span className="queue-part__id mono">{p.id}</span>
                  </td>
                  <td>{pk ? pk.title : p.pack}</td>
                  <td>
                    <TrustChip trust={p.trust} />
                  </td>
                  <td>
                    <span className={`gate gate--${p.gate}`}>
                      {p.gate === "test" ? (
                        <FlaskConical className="lucide" />
                      ) : (
                        <Eye className="lucide" />
                      )}
                      {p.gate}
                    </span>
                  </td>
                  <td>{p.owner}</td>
                  <td className="muted">{p.tested_in ?? "—"}</td>
                </tr>
              );
            })}
            {shown.length === 0 && (
              <tr>
                <td colSpan={6} className="muted" style={{ textAlign: "center", padding: 24 }}>
                  No parts match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
