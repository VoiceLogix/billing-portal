import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(), // This plugin injects CSS into JS for better library support
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "Billing-Portal",
      fileName: () => "index.bundle.js",
      formats: ["umd"],
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  server: {
    fs: { strict: false },
    open: "/index.html",
    port: 3000,
  },
});
