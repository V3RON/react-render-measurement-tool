import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/setup.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  splitting: false,
  dts: {
    resolve: ['@react-render-measurement-tool/core'],
  },
});
