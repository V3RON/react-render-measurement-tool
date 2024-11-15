import type React from "react";
import type { ProfilingDataForRootBackend } from "react-devtools-inline";
import { getOperations, getRendererInterface } from "./devtools";
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
    const devTools = getRendererInterface();

    devTools.startProfiling(true);
    const renderResult = renderer.render(ui);

    if (options?.scenario) {
      await options.scenario(renderResult);
    }

    devTools.stopProfiling();

    const profilingData = devTools.getProfilingData();
    const operations = getOperations(devTools);

    const rootData = profilingData.dataForRoots.at(-1) as ProfilingDataForRootBackend;

    return {
      rawProfilingData: profilingData,
      commits: rootData.commitData.map((commit) => ({
        changes: commit.changeDescriptions
          ? commit.changeDescriptions.map(([fiberId, change]) => ({
              isFirstMount: change.isFirstMount,
              didHooksChange: change.didHooksChange,
              props: change.props,
              state: change.state,
              hooks: change.hooks ?? null,
              context: !!change.context,
              componentType: devTools.getElementSourceFunctionById(fiberId),
            }))
          : [],
        timestamp: commit.timestamp,
        duration: commit.duration,
      })),
      exportProfilingData: () => ({
        version: 5,
        dataForRoots: [
          {
            ...rootData,
            operations,
          },
        ],
        timelineData: undefined,
      }),
    };
  };
};
