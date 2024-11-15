import type React from "react";
import type { ProfilingDataForRootBackend } from "react-devtools-inline";
import { getOperations, getRendererInterface } from "./devtools";
import type { MeasureResult, ReactRenderer } from "./types";

export interface MeasureOptions<TRenderResult> {
  scenario?: (screen: TRenderResult) => Promise<void>;
}

export type MeasureFunc<TRenderResult> = (
  ui: React.ReactElement,
  options?: MeasureOptions<TRenderResult>,
) => Promise<MeasureResult>;

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
              context: change.context,
              componentType: devTools.getElementSourceFunctionById(fiberId),
            }))
          : [],
        timestamp: commit.timestamp,
        duration: commit.duration,
        priorityLevel: commit.priorityLevel,
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
