/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    setupFiles: ['./src/setup.ts'],
    environment: 'jsdom',
  },
})
