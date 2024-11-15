import {
  type MeasureFunc as CoreMeasureFunc,
  type MeasureOptions as CoreMeasureOptions,
  type ReactRenderer,
  createMeasure,
} from "@react-render-measurement-tool/core";
import { type RenderResult, render } from "@testing-library/react-native";

const renderer: ReactRenderer<RenderResult> = {
  name: "react-native",
  render,
};

export const measure = createMeasure(renderer);
export type MeasureOptions = CoreMeasureOptions<RenderResult>;
export type MeasureFunc = CoreMeasureFunc<RenderResult>;
