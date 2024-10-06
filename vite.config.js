import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // build시 경로
  base: "/chat/",
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
