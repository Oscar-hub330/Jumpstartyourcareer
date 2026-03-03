import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/",

    plugins: [
      react(),
      tailwindcss()
    ],

    build: {
      target: "es2019",
      sourcemap: false,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        maxParallelFileOps: 2
      }
    },

    /* ================= LOCAL DEV SERVER ================= */
    server: {
      host: true,
      port: 3000,
      strictPort: false,

      proxy: {
        /* Main API */
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
          secure: false
        },

        /* Newsletter endpoint */
        "/newsletter": {
          target: "http://localhost:4000",
          changeOrigin: true,
          secure: false
        },

        /* Uploaded files */
        "/uploads": {
          target: "http://localhost:4000",
          changeOrigin: true,
          secure: false
        }
      }
    },

    preview: {
      host: true,
      port: 4173
    },

    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL || "")
    }
  };
});