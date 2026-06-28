#!/usr/bin/env node
/**
 * lint-packs.mjs — the pack contract enforcer.
 *
 * Validates every pack doc under /packs against the contract in
 * _schema/pack.frontmatter.md. The nine rules implemented here are the
 * "CI lint" section of that file — keep the two in lockstep.
 *
 * Exit code 0 = clean (warnings allowed); 1 = at least one ERROR.
 *
 * Rule 6 nuance: a depends_on / requires reference to a pack that doesn't
 * exist YET is a WARNING (the kit is built incrementally, spec §8); a
 * malformed reference is an ERROR.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import yaml from 'js-yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PACKS_DIR = join(ROOT, 'packs');

// ---- the contract's allowed values ---------------------------------------
const PACK_TYPES = ['element', 'outcome', 'tool'];
const PARTS = ['standard', 'policy', 'method', 'build', 'process', 'commercials'];
const TRUST = ['draft', 'reviewed', 'tested', 'live', 'deprecated'];
const GATES = ['test', 'review'];
const REQUIRED = ['id', 'pack_type', 'title', 'version', 'owner', 'trust'];
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
// trust rank for rule 9 (deprecated treated as off-ladder / lowest)
const TRUST_RANK = { deprecated: 0, draft: 0, reviewed: 1, tested: 2, live: 3 };

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

// ---- gather every .md under /packs (README.md are folder docs, skipped) ---
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.md') && name !== 'README.md') out.push(full);
  }
  return out;
}

function parseFrontmatter(raw, file) {
  if (!raw.startsWith('---')) {
    err(file, 'rule 1: missing YAML frontmatter (file must start with "---")');
    return null;
  }
  const end = raw.indexOf('\n---', 3);
  if (end === -1) {
    err(file, 'rule 1: frontmatter block is not closed with "---"');
    return null;
  }
  const block = raw.slice(3, end);
  try {
    const data = yaml.load(block);
    if (data === null || typeof data !== 'object') {
      err(file, 'rule 1: frontmatter did not parse to a mapping');
      return null;
    }
    return data;
  } catch (e) {
    err(file, `rule 1: frontmatter is not valid YAML — ${e.message.split('\n')[0]}`);
    return null;
  }
}

const files = walk(PACKS_DIR);
const docs = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const fm = parseFrontmatter(readFileSync(file, 'utf8'), rel);
  if (!fm) continue;

  const isPackDoc = basename(file) === '_pack.md';
  docs.push({ file, rel, fm, isPackDoc });

  // rule 2 — required fields present
  for (const field of REQUIRED) {
    if (fm[field] === undefined || fm[field] === null || fm[field] === '') {
      err(rel, `rule 2: required field "${field}" missing`);
    }
  }

  // rule 5 (partial) — enum values
  if (fm.pack_type !== undefined && !PACK_TYPES.includes(fm.pack_type)) {
    err(rel, `rule 5: pack_type "${fm.pack_type}" not in ${PACK_TYPES.join('|')}`);
  }
  if (fm.trust !== undefined && !TRUST.includes(fm.trust)) {
    err(rel, `rule 5: trust "${fm.trust}" not in ${TRUST.join('|')}`);
  }

  // rule 4 — semver
  if (fm.version !== undefined && !SEMVER.test(String(fm.version))) {
    err(rel, `rule 4: version "${fm.version}" is not valid semver (MAJOR.MINOR.PATCH)`);
  }

  // rule 3 — part docs carry a gate; pack docs do not
  if (isPackDoc) {
    if (fm.gate !== undefined) err(rel, 'rule 3: pack-level _pack.md must NOT carry a "gate"');
  } else {
    if (fm.gate === undefined || fm.gate === null) {
      err(rel, 'rule 3: part doc must carry a "gate"');
    } else if (!GATES.includes(fm.gate)) {
      err(rel, `rule 5: gate "${fm.gate}" not in ${GATES.join('|')}`);
    }
    if (fm.part !== undefined && !PARTS.includes(fm.part)) {
      err(rel, `rule 5: part "${fm.part}" not in ${PARTS.join('|')}`);
    }
  }

  // rule 8 — live docs need sign-off (and test evidence if test-gated)
  if (fm.trust === 'live') {
    for (const f of ['signed_off_by', 'signed_off_at']) {
      if (!fm[f]) err(rel, `rule 8: trust:live requires "${f}"`);
    }
    if (fm.gate === 'test') {
      for (const f of ['tested_by', 'tested_at', 'tested_in']) {
        if (!fm[f]) err(rel, `rule 8: trust:live + gate:test requires "${f}"`);
      }
    }
  }

  // rule 7 — folder path matches declared pack / part / band
  checkPath(rel, fm, isPackDoc);
}

// ---- rule 7: path ↔ frontmatter -----------------------------------------
function checkPath(rel, fm, isPackDoc) {
  const parts = rel.split(sep); // packs/<kind>/...
  const kind = parts[1]; // elements | outcomes | tools
  if (kind === 'elements') {
    // packs/elements/<class>/<NN-band>/<file>.md
    const cls = parts[2];
    const bandFolder = parts[3];
    const m = /^(\d{2})-/.exec(bandFolder || '');
    if (!m) {
      err(rel, `rule 7: element band folder "${bandFolder}" must be "NN-name"`);
      return;
    }
    const expectedPack = `${cls}.${m[1]}`;
    if (isPackDoc) {
      if (fm.id !== expectedPack) {
        err(rel, `rule 7: _pack.md id "${fm.id}" should be "${expectedPack}" (from path)`);
      }
    } else {
      if (fm.pack !== expectedPack) {
        err(rel, `rule 7: pack "${fm.pack}" should be "${expectedPack}" (from path)`);
      }
      const stem = basename(rel, '.md');
      if (fm.part !== stem) {
        err(rel, `rule 7: part "${fm.part}" should match filename "${stem}"`);
      }
      if (fm.id !== `${expectedPack}.${stem}`) {
        err(rel, `rule 7: id "${fm.id}" should be "${expectedPack}.${stem}" (from path)`);
      }
    }
  } else if (kind === 'outcomes' || kind === 'tools') {
    // packs/<kind>/<slug>/<file>.md
    const slug = parts[2];
    if (isPackDoc) {
      if (fm.id !== slug) err(rel, `rule 7: _pack.md id "${fm.id}" should be "${slug}" (from path)`);
    } else {
      if (fm.pack !== slug) err(rel, `rule 7: pack "${fm.pack}" should be "${slug}" (from path)`);
      const stem = basename(rel, '.md');
      if (fm.part !== stem) err(rel, `rule 7: part "${fm.part}" should match filename "${stem}"`);
    }
  } else {
    err(rel, `rule 7: unexpected location under /packs (kind="${kind}")`);
  }
}

// ---- build the set of known pack ids (for rule 6) ------------------------
const knownPacks = new Set(docs.filter(d => d.isPackDoc).map(d => d.fm.id).filter(Boolean));
const PACK_ID = /^[a-z0-9-]+(\.\d{2})?$/; // <outcome-slug> or <class>.NN

function checkRef(rel, ref, kind) {
  if (typeof ref !== 'string' || !PACK_ID.test(ref)) {
    err(rel, `rule 6: ${kind} entry "${ref}" is not a well-formed pack id`);
    return;
  }
  if (!knownPacks.has(ref)) {
    warn(rel, `rule 6: ${kind} references "${ref}" which is not authored yet (build-out OK)`);
  }
}

for (const { rel, fm } of docs) {
  if (Array.isArray(fm.depends_on)) {
    for (const ref of fm.depends_on) checkRef(rel, ref, 'depends_on');
  }
  if (Array.isArray(fm.requires)) {
    for (const r of fm.requires) {
      if (r && typeof r === 'object' && 'pack' in r) checkRef(rel, r.pack, 'requires');
      else err(rel, `rule 6: requires entry must be {pack, band}, got ${JSON.stringify(r)}`);
    }
  }
}

// ---- rule 9: _pack.md trust ≤ min(part trust) ---------------------------
const partsByPack = new Map();
for (const d of docs) {
  if (d.isPackDoc) continue;
  if (!partsByPack.has(d.fm.pack)) partsByPack.set(d.fm.pack, []);
  partsByPack.get(d.fm.pack).push(d.fm.trust);
}
for (const { rel, fm, isPackDoc } of docs) {
  if (!isPackDoc) continue;
  const partTrusts = partsByPack.get(fm.id) || [];
  if (!partTrusts.length) continue;
  const minRank = Math.min(...partTrusts.map(t => TRUST_RANK[t] ?? 0));
  if ((TRUST_RANK[fm.trust] ?? 0) > minRank) {
    err(rel, `rule 9: _pack.md trust "${fm.trust}" is higher than the weakest part's trust`);
  }
}

// ---- report --------------------------------------------------------------
for (const w of warnings) console.warn(`  ⚠ WARN  ${w}`);
for (const e of errors) console.error(`  ✗ ERROR ${e}`);

const n = docs.length;
if (errors.length) {
  console.error(`\nPack lint FAILED — ${errors.length} error(s), ${warnings.length} warning(s) across ${n} doc(s).`);
  process.exit(1);
}
console.log(`\nPack lint passed — ${n} doc(s) valid, ${warnings.length} warning(s).`);
