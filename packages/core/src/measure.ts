import type React from "react";
import { getOperations, getRendererInterface, getTestRootProfilingData } from "./devtools";
import { getCommits, getSummary } from "./mapper";
import type { MeasureResult, ReactRenderer } from "./types";

/**
 * Configuration options for measuring React component rendering performance
 * @template TRenderResult The testing library's render result type (e.g. RTL's RenderResult)
 */
export interface MeasureOptions<TRenderResult> {
  /**
   * Define an async scenario to run after the initial render.
   * Useful for measuring performance after user interactions or data loading.
   * @param screen The testing library's screen utilities for querying and interacting with components
   */
  scenario?: (screen: TRenderResult) => Promise<void>;
}

/**
 * A function to measure React component rendering performance
 * @template TRenderResult The testing library's render result type (e.g. RTL's RenderResult)
 */
export type MeasureFunc<TRenderResult> = (
  ui: React.ReactElement,
  options?: MeasureOptions<TRenderResult>,
) => Promise<MeasureResult>;

/**
 * Creates a measurement function compatible with your testing environment
 * @template TRenderResult The testing library's render result type (e.g. RTL's RenderResult)
 * @param renderer Your testing environment's renderer (e.g. React Testing Library or React Native Testing Library)
 * @returns A function to measure rendering performance of your React components
 */
export const createMeasure = <TRenderResult>(renderer: ReactRenderer<TRenderResult>): MeasureFunc<TRenderResult> => {
  return async (ui: React.ReactElement, options?: MeasureOptions<TRenderResult>): Promise<MeasureResult> => {
    const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    const devTools = getRendererInterface(hook);

    devTools.startProfiling(true);
    const renderResult = renderer.render(ui);

    if (options?.scenario) {
      await options.scenario(renderResult);
    }

    devTools.stopProfiling();

    const profilingData = devTools.getProfilingData();
    const operations = getOperations(devTools);
    const testRootData = getTestRootProfilingData(profilingData);

    return {
      summary: getSummary(testRootData),
      commits: getCommits(devTools, testRootData),
      rawProfilingData: profilingData,
      exportProfilingData: () => ({
        version: 5,
        dataForRoots: [
          {
            ...testRootData,
            operations,
          },
        ],
        timelineData: undefined,
      }),
    };
  };
};
