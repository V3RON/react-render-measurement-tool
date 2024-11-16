import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/setup.ts"],
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
});
