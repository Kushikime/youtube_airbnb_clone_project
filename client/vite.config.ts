import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/shared/components"),
      "@icons": path.resolve(__dirname, "src/shared/icons"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@features": path.resolve(__dirname, "src/features"),
    },
  },
});
