/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    setupFiles: ["./src/setup.ts", "./src/__tests__/setup.ts"],
    environment: "jsdom",
  },
});
