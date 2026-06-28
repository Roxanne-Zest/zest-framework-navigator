// Fetching + cleaning markdown bodies. The prebuild copied every pack/part body
// into public/<bodyPath>; we fetch by the same path the manifest records. This
// is the only fetch in the app and it hits our own origin (the copied files) —
// never GitHub, never any API. Build-time data, served statically.
import { useEffect, useState } from "react";

/** Strip the leading YAML frontmatter block so only the prose renders. */
export function stripFrontmatter(raw: string): string {
  if (!raw.startsWith("---")) return raw;
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return raw;
  // Skip past the closing fence and its trailing newline.
  const after = raw.indexOf("\n", end + 1);
  return after === -1 ? "" : raw.slice(after + 1).replace(/^\s+/, "");
}

function bodyUrl(bodyPath: string): string {
  // BASE_URL ends with "/" (or is "./"); bodyPath is repo-relative with no
  // leading slash, so they concatenate to a URL relative to wherever the bundle
  // is mounted inside the shell.
  return `${import.meta.env.BASE_URL}${bodyPath}`;
}

export type BodyState =
  | { status: "loading" }
  | { status: "ready"; markdown: string }
  | { status: "error"; message: string };

/** Fetch a body by its manifest bodyPath, frontmatter stripped. */
export function useBody(bodyPath: string | undefined): BodyState {
  const [state, setState] = useState<BodyState>({ status: "loading" });
  useEffect(() => {
    if (!bodyPath) {
      setState({ status: "error", message: "No body path." });
      return;
    }
    let cancelled = false;
    setState({ status: "loading" });
    fetch(bodyUrl(bodyPath))
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.text();
      })
      .then((text) => {
        if (!cancelled) setState({ status: "ready", markdown: stripFrontmatter(text) });
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setState({ status: "error", message: e instanceof Error ? e.message : String(e) });
      });
    return () => {
      cancelled = true;
    };
  }, [bodyPath]);
  return state;
}
