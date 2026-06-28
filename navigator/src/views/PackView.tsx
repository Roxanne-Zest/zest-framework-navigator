// Pack view — the _pack.md overview plus the six parts, each rendered via
// react-markdown. Every part carries a badge row (trust · gate · owner ·
// tested_in). When the pack is below `live` the "Unverified — not for client
// delivery" banner sits at the top. The dependency view is built from the pack's
// depends_on (what must exist first) and unlocks (what this enables).
import { useState } from "react";
import { ArrowLeft, FlaskConical, Eye, User, FileCheck2, ChevronDown } from "lucide-react";
import { packById, humanise } from "../data/manifest";
import { trustMeta, isClientSafe } from "../lib/trust";
import { useBody } from "../lib/body";
import { Markdown } from "../components/Markdown";
import { TrustChip, GhostChip, Banner } from "../components/Bits";
import type { Part } from "../data/types";
import type { Route } from "../lib/router";

const PART_TITLE: Record<string, string> = {
  standard: "Standard",
  policy: "Policy",
  method: "Method",
  build: "Build / Install",
  process: "Process",
  commercials: "Commercials",
};

export function PackView({ id, navigate }: { id: string; navigate: (r: Route) => void }) {
  const pack = packById(id);

  if (!pack) {
    return (
      <>
        <button className="back" type="button" onClick={() => navigate({ name: "grid" })}>
          <ArrowLeft className="lucide" /> Back to grid
        </button>
        <div className="panel">
          <h2>Pack not found</h2>
          <p className="muted">
            No pack with id <code>{id}</code> is in the manifest.
          </p>
        </div>
      </>
    );
  }

  const m = trustMeta(pack.trust);
  const clientSafe = isClientSafe(pack.trust);

  return (
    <>
      <button className="back" type="button" onClick={() => navigate({ name: "grid" })}>
        <ArrowLeft className="lucide" /> Back to grid
      </button>

      <header className="detail-head">
        <div className="detail-head__row">
          <h1>{pack.title}</h1>
          <TrustChip trust={pack.trust} />
        </div>
        <div className="meta">
          <span>
            <code>{pack.id}</code>
          </span>
          <span>·</span>
          <span>{humanise(pack.pack_type)}</span>
          <span>·</span>
          <span>v{pack.version}</span>
          <span>·</span>
          <span>
            <User className="lucide inline" /> {pack.owner}
          </span>
          {typeof pack.band_from === "number" && typeof pack.band_to === "number" ? (
            <>
              <span>·</span>
              <span>
                band {pack.band_from} → {pack.band_to}
              </span>
            </>
          ) : null}
        </div>
      </header>

      {!clientSafe && (
        <Banner kind="error">
          <strong>Unverified — not for client delivery.</strong> This pack is at{" "}
          <code>{pack.trust}</code>. Only <code>live</code> packs are client-safe and
          generatable; treat everything below as a proposal until it has been verified.
        </Banner>
      )}

      <Dependencies pack={pack} navigate={navigate} />

      <section className="pack-overview">
        <h2 className="section-title">Overview</h2>
        <Body bodyPath={pack.bodyPath} />
      </section>

      <section>
        <h2 className="section-title">
          The six parts <span className="muted small">· {pack.parts.length} present</span>
        </h2>
        <div className="parts">
          {pack.parts.map((part) => (
            <PartSection key={part.id} part={part} />
          ))}
        </div>
      </section>

      <p className="muted small build-stamp">
        Pack trust <strong>{m.label}</strong> = the lowest trust of its parts. Rendered from
        the build-time manifest — no live data.
      </p>
    </>
  );
}

function Dependencies({
  pack,
  navigate,
}: {
  pack: NonNullable<ReturnType<typeof packById>>;
  navigate: (r: Route) => void;
}) {
  const dependsOn = pack.depends_on ?? [];
  const unlocks = pack.unlocks ?? [];
  if (dependsOn.length === 0 && unlocks.length === 0) return null;
  return (
    <section className="deps panel">
      <h2 className="section-title">Dependencies</h2>
      <div className="deps__cols">
        <div className="deps__col">
          <div className="deps__label">Depends on</div>
          {dependsOn.length === 0 ? (
            <span className="muted small">Nothing — this is a base pack.</span>
          ) : (
            <ul className="deps__list">
              {dependsOn.map((dep) => {
                const exists = packById(dep);
                return (
                  <li key={dep}>
                    {exists ? (
                      <button
                        type="button"
                        className="linklike"
                        onClick={() => navigate({ name: "pack", id: dep })}
                      >
                        <code>{dep}</code>
                      </button>
                    ) : (
                      <span title="prerequisite pack not yet authored">
                        <code>{dep}</code> <GhostChip>not yet drafted</GhostChip>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="deps__arrow" aria-hidden>
          →
        </div>
        <div className="deps__col">
          <div className="deps__label">This pack</div>
          <div className="deps__self">
            <code>{pack.id}</code>
            <TrustChip trust={pack.trust} />
          </div>
        </div>
        <div className="deps__arrow" aria-hidden>
          →
        </div>
        <div className="deps__col">
          <div className="deps__label">Unlocks</div>
          {unlocks.length === 0 ? (
            <span className="muted small">Nothing yet.</span>
          ) : (
            <ul className="deps__list">
              {unlocks.map((u) => {
                const exists = packById(u);
                return (
                  <li key={u}>
                    {exists ? (
                      <button
                        type="button"
                        className="linklike"
                        onClick={() => navigate({ name: "pack", id: u })}
                      >
                        <code>{u}</code>
                      </button>
                    ) : (
                      <code>{u}</code>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function PartBadges({ part }: { part: Part }) {
  return (
    <div className="part__badges">
      <TrustChip trust={part.trust} />
      <span
        className={`chip chip--ghost gate gate--${part.gate}`}
        title={
          part.gate === "test"
            ? "test-gated — must be executed in a sandbox"
            : "review-gated — human read-through"
        }
      >
        {part.gate === "test" ? (
          <FlaskConical className="lucide" />
        ) : (
          <Eye className="lucide" />
        )}
        {part.gate}
      </span>
      <span className="chip chip--ghost" title="owner">
        <User className="lucide" /> {part.owner}
      </span>
      <span
        className="chip chip--ghost"
        title={part.tested_in ? "tested in" : "not yet tested"}
      >
        <FileCheck2 className="lucide" />{" "}
        {part.tested_in ?? "not tested"}
      </span>
    </div>
  );
}

function PartSection({ part }: { part: Part }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={`part${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="part__head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <div className="part__heading">
          <span className="part__name">{PART_TITLE[part.part] ?? humanise(part.part)}</span>
          <PartBadges part={part} />
        </div>
        <ChevronDown className={`lucide part__chev${open ? " is-open" : ""}`} />
      </button>
      {open && (
        <div className="part__body">
          {part.verify_notes ? (
            <p className="part__notes muted small">Verify notes: {part.verify_notes}</p>
          ) : null}
          <Body bodyPath={part.bodyPath} />
        </div>
      )}
    </article>
  );
}

function Body({ bodyPath }: { bodyPath: string }) {
  const state = useBody(bodyPath);
  if (state.status === "loading") return <p className="muted">Loading…</p>;
  if (state.status === "error")
    return (
      <p className="muted">
        Couldn't load <code>{bodyPath}</code> — {state.message}
      </p>
    );
  return <Markdown>{state.markdown}</Markdown>;
}
