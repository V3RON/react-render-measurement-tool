import type { ComponentType, ReactElement } from "react";
import type { ProfilingDataBackend } from "react-devtools-inline";

/**
 * Represents a React renderer implementation for a specific testing environment
 * @template TRenderResult The testing library's render result type (e.g. RTL's RenderResult)
 */
export type ReactRenderer<TRenderResult> = {
  /** The name identifier for the renderer */
  name: string;
  /** Function to render a React element and return the testing library's result */
  render: (ui: ReactElement) => TRenderResult;
};

/**
 * Describes changes detected in a React component during profiling
 */
export type ChangeData = {
  /** Whether the component's context has changed */
  context: boolean;
  /** Whether any hooks have changed their values */
  didHooksChange: boolean;
  /** Whether this is the component's initial mount */
  isFirstMount: boolean;
  /** Array of prop names that changed, or null if no prop changes */
  props: string[] | null;
  /** Array of state keys that changed, or null if no state changes */
  state: string[] | null;
  /** Array of hook indices that changed, or null if no hook changes */
  hooks: number[] | null;
  /** The component's type (class or function component), or null if not available */
  componentType: ComponentType | null;
};

/**
 * Represents performance data for a single commit phase
 */
export type CommitData = {
  /** Time taken to complete the commit in milliseconds */
  duration: number;
  /** Unix timestamp when the commit occurred */
  timestamp: number;
  /** Array of changes detected during this commit */
  changes: ChangeData[];
};

/**
 * Contains the complete measurement results including commits and profiling data
 */
export type MeasureResult = {
  /** Array of commit performance data */
  commits: CommitData[];
  /** Raw profiling data from React DevTools */
  rawProfilingData: ProfilingDataBackend;
  /** Function to export the profiling data in a format compatible with React DevTools */
  exportProfilingData: () => unknown;
};
