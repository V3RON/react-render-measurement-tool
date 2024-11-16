import type {
  DevToolsHook,
  ProfilingDataBackend,
  ProfilingDataForRootBackend,
  RendererInterface,
} from "react-devtools-inline";

export const getRendererInterface = (hook: DevToolsHook): RendererInterface => {
  if (
    !hook ||
    typeof hook !== "object" ||
    !("rendererInterfaces" in hook) ||
    !(hook.rendererInterfaces instanceof Map)
  ) {
    throw new Error("Value of __REACT_DEVTOOLS_GLOBAL_HOOK__ is different than expected.");
  }

  const devTools = hook.rendererInterfaces.get(1);

  if (
    !devTools ||
    !("startProfiling" in devTools) ||
    !("stopProfiling" in devTools) ||
    !("getProfilingData" in devTools) ||
    !("getElementSourceFunctionById" in devTools)
  ) {
    throw new Error("Invalid renderer detected.");
  }

  return devTools as RendererInterface;
};

export const getOperations = (devTools: RendererInterface): number[][] => {
  const operations: number[][] = [];

  const unsubscribe = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.sub("operations", (data) => {
    operations.push(data as number[]);
  });
  devTools.flushInitialOperations();

  unsubscribe();
  return operations;
};

export const getTestRootProfilingData = (profilingData: ProfilingDataBackend): ProfilingDataForRootBackend => {
  // We assume it's always the last one.
  const data = profilingData.dataForRoots.at(-1);

  if (!data) {
    throw new Error("Test root not found!");
  }

  return data;
};
