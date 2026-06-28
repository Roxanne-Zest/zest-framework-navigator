// Types for the manifest the navigator builds against. Mirrors the data
// contract in docs/manifest.md and the pack contract in
// _schema/pack.frontmatter.md. The manifest is the single source of truth for
// every view — nothing here is invented at runtime.

export type Trust = "draft" | "reviewed" | "tested" | "live" | "deprecated";
export type Gate = "test" | "review";
export type PackType = "element" | "outcome" | "tool";
export type PartName =
  | "standard"
  | "policy"
  | "method"
  | "build"
  | "process"
  | "commercials";

export interface Part {
  id: string;
  pack: string;
  pack_type: PackType;
  part: PartName;
  title: string;
  version: string;
  owner: string;
  trust: Trust;
  gate: Gate;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  tested_by?: string | null;
  tested_at?: string | null;
  tested_in?: string | null;
  signed_off_by?: string | null;
  signed_off_at?: string | null;
  verify_notes?: string;
  effort_days?: number | null;
  band_from?: number;
  band_to?: number;
  unlocks?: string[];
  depends_on?: string[];
  templates?: string[];
  bodyPath: string;
}

export interface BenefitModel {
  metric?: string;
  unit?: string;
  direction?: "up" | "down";
  value_per_unit?: number | null;
  baseline_method?: string;
  realisation_method?: string;
  cadence?: string;
}

export interface RequiresRef {
  pack: string;
  band: number;
}

export interface Pack {
  id: string;
  pack_type: PackType;
  title: string;
  version: string;
  owner: string;
  trust: Trust;
  band_from?: number;
  band_to?: number;
  unlocks?: string[];
  depends_on?: string[];
  // outcome-only
  domain?: string;
  value?: string;
  requires?: RequiresRef[];
  benefit_model?: BenefitModel;
  bodyPath: string;
  parts: Part[];
}

export interface Manifest {
  generatedAt: string;
  classes: string[];
  bands: string[];
  packs: Pack[];
}
