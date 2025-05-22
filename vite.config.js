import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
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
    // proxy: {
    //   "/oauth": {
    //     target: "https://app.onebillsoftware.com",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/oauth/, "/oauth"),
    //   },
    // },
  },
});
