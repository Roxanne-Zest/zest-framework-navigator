// Navigator root. Reuses the Zest Delivery shell's layout shape: a `.zest-dash`
// grid of sidebar + main/content. When mounted *inside* the shell (embed mode)
// the navigator drops its own sidebar — the host shell's DashSidebar is the
// chrome — and renders just its content column into the host's frame.
//
// Read-only throughout: four views, no writes, no generation. Everything is
// driven by the build-time manifest.
import { useRouter, isEmbedded } from "./lib/router";
import { Sidebar } from "./shell/Sidebar";
import { GridIndex } from "./views/GridIndex";
import { OutcomesIndex } from "./views/OutcomesIndex";
import { PackView } from "./views/PackView";
import { Queue } from "./views/Queue";

export function App() {
  const { route, navigate } = useRouter();
  const embedded = isEmbedded();

  return (
    <div className={`zest-dash${embedded ? " zest-dash--embed" : ""}`}>
      {!embedded && <Sidebar route={route} navigate={navigate} />}
      <main className="main">
        <div className="content">
          {route.name === "grid" && <GridIndex navigate={navigate} />}
          {route.name === "outcomes" && <OutcomesIndex navigate={navigate} />}
          {route.name === "queue" && <Queue navigate={navigate} />}
          {route.name === "pack" && <PackView id={route.id} navigate={navigate} />}
        </div>
      </main>
    </div>
  );
}
