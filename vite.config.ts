import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    cors: { origin: "*" },
    proxy: {
      "/": {
        target: "https://image-aware-background.vercel.app",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\//, ""),
      },
    },
  },
});
