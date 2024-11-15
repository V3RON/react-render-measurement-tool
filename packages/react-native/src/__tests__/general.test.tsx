import { measure } from "..";

describe("[React Native] General", () => {
  it("should include initial render", async () => {
    const result = await measure(<div>Test component</div>);

    expect(result.commits).toHaveLength(1);
  });
});
