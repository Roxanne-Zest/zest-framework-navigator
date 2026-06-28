// Trust → colour, the single source for the UI (docs/manifest.md §Trust → colour).
//
//   draft       red     not client-safe
//   reviewed    amber   not client-safe
//   tested      amber   not client-safe   (amber-green: one rung off live)
//   live        green   CLIENT-SAFE
//   deprecated  grey    not client-safe
//
// Only `live` is client-safe. Everything below carries the "Unverified — not for
// client delivery" banner in the pack view.
import type { Trust } from "../data/types";

export type RagTone = "red" | "amber" | "amber-green" | "green" | "grey";

export interface TrustMeta {
  tone: RagTone;
  /** CSS class suffix used by the citrus chip system (chip--r / --a / --g / --n). */
  chip: "r" | "a" | "g" | "n";
  label: string;
  clientSafe: boolean;
  /** Rung order for sorting the verification queue (lower = less verified). */
  rung: number;
}

const TABLE: Record<Trust, TrustMeta> = {
  draft: { tone: "red", chip: "r", label: "Draft", clientSafe: false, rung: 0 },
  reviewed: { tone: "amber", chip: "a", label: "Reviewed", clientSafe: false, rung: 1 },
  tested: { tone: "amber-green", chip: "a", label: "Tested", clientSafe: false, rung: 2 },
  live: { tone: "green", chip: "g", label: "Live", clientSafe: true, rung: 3 },
  deprecated: { tone: "grey", chip: "n", label: "Deprecated", clientSafe: false, rung: -1 },
};

export function trustMeta(trust: Trust): TrustMeta {
  return TABLE[trust] ?? TABLE.draft;
}

export const TRUST_ORDER: Trust[] = ["draft", "reviewed", "tested", "live", "deprecated"];

export function isClientSafe(trust: Trust): boolean {
  return trustMeta(trust).clientSafe;
}
