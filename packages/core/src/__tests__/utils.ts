import { render } from "@testing-library/react";
import { createMeasure } from "../measure";

export const measure = createMeasure({
  render,
});
