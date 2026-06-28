// A tiny query-string router, mirroring the Zest Delivery shell's own approach
// (App.tsx reflects views into ?v=…). No react-router dependency — views are
// shareable via the URL and back/forward works. When embedded in the shell the
// navigator owns only its own query params; the host owns the path.
import { useEffect, useState } from "react";

export type Route =
  | { name: "grid" }
  | { name: "outcomes" }
  | { name: "queue" }
  | { name: "pack"; id: string };

export function routeToQuery(route: Route): string {
  switch (route.name) {
    case "grid":
      return "";
    case "outcomes":
      return "view=outcomes";
    case "queue":
      return "view=queue";
    case "pack":
      return `view=pack&id=${encodeURIComponent(route.id)}`;
  }
}

export function parseRoute(): Route {
  const sp = new URLSearchParams(window.location.search);
  const view = sp.get("view");
  const id = sp.get("id") ?? "";
  switch (view) {
    case "outcomes":
      return { name: "outcomes" };
    case "queue":
      return { name: "queue" };
    case "pack":
      return id ? { name: "pack", id } : { name: "grid" };
    default:
      return { name: "grid" };
  }
}

export function isEmbedded(): boolean {
  const sp = new URLSearchParams(window.location.search);
  if (sp.get("embed") === "1") return true;
  try {
    return window.self !== window.top;
  } catch {
    // Cross-origin framing throws on access — that means we are embedded.
    return true;
  }
}

export function useRouter(): { route: Route; navigate: (r: Route) => void } {
  const [route, setRoute] = useState<Route>(() => parseRoute());

  useEffect(() => {
    const onPop = () => setRoute(parseRoute());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function navigate(next: Route) {
    const sp = new URLSearchParams(window.location.search);
    // Preserve the embed flag across navigations so chrome stays consistent.
    const embed = sp.get("embed");
    const q = routeToQuery(next);
    const params = new URLSearchParams(q);
    if (embed) params.set("embed", embed);
    const qs = params.toString();
    const target = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
    history.pushState({}, "", target);
    setRoute(next);
    // Scroll the content back to top on a view change, like a page nav.
    window.scrollTo(0, 0);
  }

  return { route, navigate };
}
