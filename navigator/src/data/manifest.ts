// The manifest, imported at build time. scripts/prebuild.mjs vendors a fresh
// copy into src/generated/manifest.json (gitignored, derived) before every dev
// run and build. This module is the only place the raw JSON is read; everything
// else works against the typed `manifest` and the selectors below.
import raw from "../generated/manifest.json";
import type { Manifest, Pack, Part, Trust } from "./types";

export const manifest = raw as unknown as Manifest;

export const classes = manifest.classes;
export const bands = manifest.bands;
export const packs = manifest.packs;

/** All element packs, keyed by id (e.g. "infrastructure.03"). */
export function elementPacks(): Pack[] {
  return packs.filter((p) => p.pack_type === "element");
}

export function outcomePacks(): Pack[] {
  return packs.filter((p) => p.pack_type === "outcome");
}

export function packById(id: string | undefined | null): Pack | undefined {
  if (!id) return undefined;
  return packs.find((p) => p.id === id);
}

/** Band slug "03-contextualise" → its number 3. */
export function bandNumber(bandSlug: string): number {
  return Number.parseInt(bandSlug.slice(0, 2), 10);
}

/**
 * The element pack at a given grid cell, or undefined when the cell is empty.
 * A cell is (class key × band slug); an element pack id is `<class>.<NN>` where
 * NN is the band the pack climbs *to* (band_to ↔ the band slug number).
 */
export function packAtCell(classKey: string, bandSlug: string): Pack | undefined {
  const n = bandNumber(bandSlug);
  const want = `${classKey}.${String(n).padStart(2, "0")}`;
  return elementPacks().find((p) => p.id === want);
}

/** Every part across every pack, flattened — the verification queue's source. */
export function allParts(): Part[] {
  return packs.flatMap((p) => p.parts);
}

/** Pretty-print a class/domain key: "software-licences" → "Software Licences". */
export function humanise(key: string): string {
  return key
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Band slug "03-contextualise" → "Contextualise". */
export function bandLabel(bandSlug: string): string {
  return humanise(bandSlug.replace(/^\d+-/, ""));
}

export type { Manifest, Pack, Part, Trust };
