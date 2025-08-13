import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist/servicedesk",
    lib: {
      entry: path.resolve(__dirname, "src/index-service-desk.tsx"),
      name: "Service-Desk",
      fileName: () => "index.servicedesk.bundle.js",
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
