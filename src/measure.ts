import * as React from 'react';
import {
  render,
  RenderResult,
} from '@testing-library/react';
import {
  DevToolsProfilingHooks,
  ProfilingData,
} from './types.ts';

export interface MeasureOptions {
  scenario?: (screen: RenderResult) => Promise<void>;
}

export const measure = async (ui: React.ReactElement, options?: MeasureOptions): Promise<ProfilingData[]> => {
  console.assert(global.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers.length === 1);
  const renderer = global.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers.at(0)!;

  const profilingData: ProfilingData[] = [];
  let currentData: ProfilingData = null!;

  const profilingHooks: DevToolsProfilingHooks = {
    markRenderStarted: (lanes) => {
      currentData = { start: performance.now(), stop: 0, duration: 0, lanes, components: [] };
    },
    markComponentRenderStarted: (fiber) => {
      currentData.components.push(fiber.type);
    },
    markRenderStopped: () => {
      currentData.stop = performance.now();
      currentData.duration = currentData.stop - currentData.start;
      profilingData.push(currentData);
      currentData = null!;
    }
  };

  renderer.injectProfilingHooks(profilingHooks);

  const renderResult = render(ui);

  if (options?.scenario) {
    await options.scenario(renderResult);
  }

  renderer.injectProfilingHooks(null!);

  return profilingData;
}
