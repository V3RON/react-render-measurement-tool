import type { RendererInterface } from "react-devtools-inline";

export const getRendererInterface = (): RendererInterface => {
  const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

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
