// Sidebar — the navigator's primary nav, ported from the Zest Delivery shell's
// DashSidebar (zest-delivery/src/components/dash/Shell.tsx). Same markup, same
// `.zest-dash .sidebar` / `.nav__item` classes, same citrus tokens, so the
// navigator reads as a module of the shell rather than an approximation of it.
//
// When the navigator is mounted *inside* the shell (embed mode) this sidebar is
// hidden — the host shell's own DashSidebar is the chrome — see App.tsx.
import { ExternalLink, Grid3x3, ListChecks, ShieldCheck } from "lucide-react";
import type { Route } from "../lib/router";
import { BRAND } from "../brand";

const DELIVERY_HOME =
  (import.meta.env.VITE_DELIVERY_URL as string | undefined) ?? "/";

export function Sidebar({
  route,
  navigate,
}: {
  route: Route;
  navigate: (r: Route) => void;
}) {
  const active = route.name === "pack" ? "grid" : route.name;
  return (
    <aside className="sidebar">
      <button
        className="sidebar__logo"
        type="button"
        onClick={() => navigate({ name: "grid" })}
        title="Framework Navigator"
      >
        <img className="mark" src={BRAND.logo} alt="" width={30} height={30} />
        <div>
          <div className="word">zest</div>
          <div className="sub">Framework Navigator</div>
        </div>
      </button>

      <nav className="nav">
        <div className="nav__label">Framework</div>
        <button
          className={`nav__item${active === "grid" ? " is-active" : ""}`}
          onClick={() => navigate({ name: "grid" })}
        >
          <Grid3x3 className="lucide" /> <span className="nav__item-label">Grid index</span>
        </button>
        <button
          className={`nav__item${active === "outcomes" ? " is-active" : ""}`}
          onClick={() => navigate({ name: "outcomes" })}
        >
          <ListChecks className="lucide" /> <span className="nav__item-label">Outcomes</span>
        </button>
        <button
          className={`nav__item${active === "queue" ? " is-active" : ""}`}
          onClick={() => navigate({ name: "queue" })}
        >
          <ShieldCheck className="lucide" />{" "}
          <span className="nav__item-label">Verification queue</span>
        </button>
        <div className="sidebar__divider" />
        <a className="nav__item" href={DELIVERY_HOME}>
          <ExternalLink className="lucide" />{" "}
          <span className="nav__item-label">Zest Delivery</span>
        </a>
      </nav>

      <div className="sidebar__foot">
        <div className="who">
          {BRAND.product}
          <small>Read-only · {BRAND.tagline}</small>
        </div>
      </div>
    </aside>
  );
}
