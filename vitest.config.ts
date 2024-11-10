/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
	test: {
		setupFiles: ["react-render-measurement-tool/setup"],
		environment: "jsdom",
	},
});
