import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
