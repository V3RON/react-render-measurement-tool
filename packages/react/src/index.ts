import type { MeasureOptions as CoreMeasureOptions, ReactRenderer } from "@react-render-measurement-tool/core";
import { type RenderResult, render } from "@testing-library/react";

export const renderer: ReactRenderer<RenderResult> = {
  name: "react",
  render,
};

export type MeasureOptions = CoreMeasureOptions<RenderResult>;
