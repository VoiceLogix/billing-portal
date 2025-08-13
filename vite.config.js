import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
      "process.env.NODE_ENV": JSON.stringify(
        mode === "production" ? "production" : "development",
      ),
      __VITE_NS_TOKEN__: JSON.stringify(env.VITE_NS_TOKEN),
      __IS_DEV__: JSON.stringify(mode !== "production"),
    },
    server: {
      fs: { strict: false },
      open: "/index.html",
      port: 3000,
      proxy: {
        "/api": {
          target: "http://localhost:8085",
          changeOrigin: true,
          rewrite: (path) => {
            const newPath = path.replace(/^\/api/, "");
            console.log(`Proxy: ${path} -> ${newPath}`);
            return newPath;
          },
          configure: (proxy, options) => {
            proxy.on("error", (err, req, res) => {
              console.log("Proxy error:", err);
            });
            proxy.on("proxyReq", (proxyReq, req, res) => {
              console.log(
                "Sending Request to the Target:",
                req.method,
                req.url,
                "->",
                options.target + proxyReq.path,
              );
            });
            proxy.on("proxyRes", (proxyRes, req, res) => {
              console.log(
                "Received Response from the Target:",
                proxyRes.statusCode,
                req.url,
              );
            });
          },
        },
      },
    },
  };
});
