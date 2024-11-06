/**
 * This file must be executed before 'react'.
 *
 * ### Usage in Jest
 * To ensure correct execution order in Jest, add this file to the `setupFiles` array
 * in the Jest configuration (e.g., `jest.config.js` or `package.json`):
 *
 * ```js
 * // jest.config.js
 * module.exports = {
 *   setupFiles: ["<rootDir>/path/to/this/file.js"]
 * };
 * ```
 *
 * ### Usage in Vitest
 * For Vitest, use the `setupFiles` option in the configuration file (e.g., `vite.config.js` or `vitest.config.js`):
 *
 * ```js
 * // vitest.config.js
 * import { defineConfig } from 'vitest/config';
 *
 * export default defineConfig({
 *   test: {
 *     setupFiles: ["<rootDir>/path/to/this/file.js"]
 *   }
 * });
 * ```
 */

import { initialize } from "react-devtools-core";
initialize();
