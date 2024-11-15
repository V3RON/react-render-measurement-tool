import type { ReactRenderer } from "@react-render-measurement-tool/core";
import { type RenderResult, render } from "@testing-library/react-native";

export const renderer: ReactRenderer<RenderResult> = {
  name: "react-native",
  render,
};
