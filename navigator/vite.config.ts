import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the built navigator can be mounted at any path inside the
// Zest Delivery shell (it is served as a self-contained module / iframe). Pack
// bodies in public/ are fetched relative to import.meta.env.BASE_URL, so they
// resolve wherever the bundle is hosted.
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: { port: 5174 },
});
