import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/setup.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  external: ['@testing-library/react-native', 'react-test-renderer'],
  splitting: false,
  dts: {
    resolve: ['@react-render-measurement-tool/core'],
  },
});
