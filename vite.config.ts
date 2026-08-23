import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const plugins: any[] = [react(), tailwindcss()];

// vlyPlugin is only available in the Freebuff environment — load it conditionally.
if (typeof globalThis.process !== "undefined" && process.env?.VITE_CONVEX_URL) {
  try {
    const mod = await import("@vly-ai/integrations");
    if (mod.vlyPlugin) plugins.push(mod.vlyPlugin());
  } catch {
    // Not in Freebuff — skip.
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE_URL || "/",
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'esbuild',
  },
  optimizeDeps: {
    entries: ['index.html'],
    include: [
      'react', 'react/jsx-runtime', 'react-dom', 'react-dom/client',
      'react-router', '@convex-dev/auth/react', 'framer-motion',
    ],
  },
  server: { host: true, port: 5173, hmr: { overlay: false } },
  appType: "spa",
});
