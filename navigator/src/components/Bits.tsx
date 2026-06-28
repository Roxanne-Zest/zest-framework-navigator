// Small presentational bits, reusing the shell's citrus chip/pill system
// (.chip--r/a/g/n, .dot) so trust reads the same here as on a delivery board.
import type { ReactNode } from "react";
import type { Trust } from "../data/types";
import { trustMeta } from "../lib/trust";

export function TrustChip({ trust, title }: { trust: Trust; title?: string }) {
  const m = trustMeta(trust);
  return (
    <span className={`chip chip--${m.chip}`} title={title ?? `trust: ${trust}`}>
      <span className="dot" /> {m.label}
    </span>
  );
}

export function GhostChip({ children }: { children: ReactNode }) {
  return <span className="chip chip--ghost">{children}</span>;
}

export function Kicker({ children }: { children: ReactNode }) {
  return <div className="kicker">{children}</div>;
}

export function PageHeader({
  title,
  sub,
  right,
}: {
  title: string;
  sub?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="topbar">
      <div className="topbar__title">
        <h1>{title}</h1>
        {sub ? <p>{sub}</p> : null}
      </div>
      <div className="topbar__spacer" />
      {right}
    </div>
  );
}

export function Banner({
  kind = "warn",
  children,
}: {
  kind?: "warn" | "info" | "error";
  children: ReactNode;
}) {
  return <div className={`nav-banner nav-banner--${kind}`}>{children}</div>;
}
