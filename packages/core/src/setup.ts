/**
 * This file must be executed before 'react'.
 *
 * @description
 * Initializes React DevTools for performance measurement.
 *
 * @example
 * For Jest, add to setupFiles in jest.config.js:
 * ```js
 * module.exports = {
 *   setupFiles: ["<rootDir>/path/to/this/file.js"]
 * };
 * ```
 *
 * @example
 * For Vitest, add to setupFiles in vitest.config.js:
 * ```js
 * import { defineConfig } from 'vitest/config';
 *
 * export default defineConfig({
 *   test: {
 *     setupFiles: ["<rootDir>/path/to/this/file.js"]
 *   }
 * });
 * ```
 */

import { initialize } from 'react-devtools-inline';
initialize(window);
