#!/usr/bin/env node
/**
 * prebuild.mjs — build-time data pipeline for the navigator.
 *
 * 1. Runs the repo's manifest builder (scripts/build-manifest.mjs) to emit a
 *    fresh manifest.json at the repo root.
 * 2. Copies that manifest into src/generated/manifest.json so the app imports it
 *    directly (no runtime fetch for the index data).
 * 3. Copies every pack/part markdown body (the manifest's bodyPath fields) into
 *    public/<bodyPath>, so the pack view can fetch the rendered markdown at view
 *    time from its own origin.
 *
 * BUILD-TIME ONLY. The navigator never calls GitHub (or any network) at runtime
 * — everything it shows is baked in here. Re-run this whenever the packs change.
 */

import { execFileSync } from "node:child_process";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  rmSync,
  existsSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPTS_DIR = dirname(fileURLToPath(import.meta.url));
const NAV_ROOT = resolve(SCRIPTS_DIR, "..");
const REPO_ROOT = resolve(NAV_ROOT, "..");

const MANIFEST_BUILDER = join(REPO_ROOT, "scripts", "build-manifest.mjs");
const MANIFEST_SRC = join(REPO_ROOT, "manifest.json");
const GENERATED_DIR = join(NAV_ROOT, "src", "generated");
const GENERATED_MANIFEST = join(GENERATED_DIR, "manifest.json");
const PUBLIC_DIR = join(NAV_ROOT, "public");
const PUBLIC_PACKS = join(PUBLIC_DIR, "packs");

// 1. Build the manifest from the packs. The repo-root builder imports js-yaml,
//    which Node resolves from the repo-root node_modules (not the navigator's).
//    When the navigator is built in isolation (e.g. a CI job scoped to this
//    folder) those root deps may be absent — install them once if so.
const rootYaml = join(REPO_ROOT, "node_modules", "js-yaml");
if (!existsSync(rootYaml)) {
  console.log("• installing repo-root deps (js-yaml) for the manifest builder …");
  execFileSync("npm", ["install", "--no-audit", "--no-fund"], {
    cwd: REPO_ROOT,
    stdio: "inherit",
  });
}
console.log("• building manifest from /packs …");
execFileSync("node", [MANIFEST_BUILDER], { cwd: REPO_ROOT, stdio: "inherit" });

const manifest = JSON.parse(readFileSync(MANIFEST_SRC, "utf8"));

// 2. Vendor the manifest into the app for a direct import.
mkdirSync(GENERATED_DIR, { recursive: true });
writeFileSync(GENERATED_MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`• wrote ${rel(GENERATED_MANIFEST)}`);

// 3. Copy every body (pack + parts) into public/, preserving the bodyPath so the
//    app can fetch it back by the same path the manifest records.
if (existsSync(PUBLIC_PACKS)) rmSync(PUBLIC_PACKS, { recursive: true, force: true });

const bodyPaths = new Set();
for (const pack of manifest.packs) {
  if (pack.bodyPath) bodyPaths.add(pack.bodyPath);
  for (const part of pack.parts ?? []) {
    if (part.bodyPath) bodyPaths.add(part.bodyPath);
  }
}

let copied = 0;
for (const bodyPath of bodyPaths) {
  const from = join(REPO_ROOT, bodyPath);
  const to = join(PUBLIC_DIR, bodyPath);
  if (!existsSync(from)) {
    console.warn(`  ! missing body, skipped: ${bodyPath}`);
    continue;
  }
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  copied++;
}
console.log(`• copied ${copied} body file(s) into ${rel(PUBLIC_DIR)}/`);
console.log("prebuild data ready.");

function rel(p) {
  return p.startsWith(NAV_ROOT) ? "navigator" + p.slice(NAV_ROOT.length) : p;
}
