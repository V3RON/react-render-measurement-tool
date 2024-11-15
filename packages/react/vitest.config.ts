/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    setupFiles: ["@react-render-measurement-tool/core/setup", "./src/__tests__/setup.ts"],
    environment: "jsdom",
  },
});
