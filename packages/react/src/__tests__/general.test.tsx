import { describe, expect, it } from "vitest";
import { measure } from "..";

describe("General", () => {
  it("should include initial render", async () => {
    const result = await measure(<div>Test component</div>);

    expect(result.commits).toHaveLength(1);
  });
});
