#!/usr/bin/env node
/**
 * build-manifest.mjs — emit manifest.json, the navigator's data source.
 *
 * Reads every pack doc under /packs and emits a single manifest.json:
 *   { generatedAt, classes, bands, packs: [ {…pack frontmatter, bodyPath, parts:[…]} ] }
 *
 * Each pack and part record carries ALL of its frontmatter fields plus
 * `bodyPath` — the repo-relative path to its markdown body, so the app's
 * prebuild can copy the bodies into public assets and the pack view can
 * fetch them on demand.
 *
 * This is a read-only build step. It never writes into /packs.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PACKS_DIR = join(ROOT, 'packs');
const OUT = join(ROOT, 'manifest.json');

// Canonical orderings — the contract's class keys and band slugs (naming §).
const CLASSES = [
  'products', 'services', 'applications', 'platforms', 'infrastructure',
  'cloud', 'software-licences', 'end-user-devices', 'reference-data',
];
const BANDS = [
  '00-blind', '01-account', '02-manage',
  '03-contextualise', '04-service-ops', '05-automate',
];
const PART_ORDER = ['standard', 'policy', 'method', 'build', 'process', 'commercials'];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.md') && name !== 'README.md') out.push(full);
  }
  return out;
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return null;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return null;
  const data = yaml.load(raw.slice(3, end));
  return data && typeof data === 'object' ? data : null;
}

// Group docs by their owning pack folder.
const byPackDir = new Map();
for (const file of walk(PACKS_DIR)) {
  const fm = parseFrontmatter(readFileSync(file, 'utf8'));
  if (!fm) continue;
  const rec = { ...fm, bodyPath: relative(ROOT, file).split(sep).join('/') };
  const isPackDoc = basename(file) === '_pack.md';
  const dir = dirname(file);
  if (!byPackDir.has(dir)) byPackDir.set(dir, { pack: null, parts: [] });
  if (isPackDoc) byPackDir.get(dir).pack = rec;
  else byPackDir.get(dir).parts.push(rec);
}

const packs = [];
for (const { pack, parts } of byPackDir.values()) {
  if (!pack) continue; // a folder with parts but no _pack.md is a lint error, skipped here
  parts.sort((a, b) => PART_ORDER.indexOf(a.part) - PART_ORDER.indexOf(b.part));
  packs.push({ ...pack, parts });
}

// Stable ordering: elements by class then band, then outcomes, then tools.
const kindRank = { element: 0, outcome: 1, tool: 2 };
packs.sort((a, b) => {
  if (a.pack_type !== b.pack_type) return kindRank[a.pack_type] - kindRank[b.pack_type];
  return String(a.id).localeCompare(String(b.id));
});

const manifest = {
  generatedAt: new Date().toISOString(),
  classes: CLASSES,
  bands: BANDS,
  packs,
};

writeFileSync(OUT, JSON.stringify(manifest, null, 2) + '\n');
const counts = packs.reduce((m, p) => ((m[p.pack_type] = (m[p.pack_type] || 0) + 1), m), {});
console.log(
  `manifest.json written — ${packs.length} pack(s) ` +
  `(${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(', ') || 'none'}).`
);
