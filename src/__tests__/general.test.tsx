import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { measure } from "../measure";

describe("General", () => {
  it("should include initial render", async () => {
    const result = await measure(<div>Test component</div>);

    expect(result.commits).toHaveLength(1);
  });

  it("should count nested renders", async () => {
    const Screen = () => {
      const [v, setV] = useState(0);

      return (
        <div>
          <button type="button" onClick={() => setV((n) => n + 1)}>
            Update Screen
          </button>
          <span>Screen: {v}</span>

          <NestedComponent />
        </div>
      );
    };

    const NestedComponent = () => {
      const [v, setV] = useState(0);

      return (
        <div>
          <button type="button" onClick={() => setV((n) => n + 1)}>
            Update NestedComponent
          </button>
          <span>NestedComponent: {v}</span>
        </div>
      );
    };

    const { commits } = await measure(<Screen />, {
      scenario: async (screen) => {
        await userEvent.click(screen.getByText("Update Screen"));

        await userEvent.click(screen.getByText("Update NestedComponent"));
      },
    });

    expect(commits).toHaveLength(3);

    const firstCommit = commits[0];
    expect(firstCommit.changes).toHaveLength(2);

    const secondCommit = commits[1];
    expect(secondCommit.changes).toHaveLength(2);

    const thirdCommit = commits[2];
    expect(thirdCommit.changes).toHaveLength(1);
    expect(thirdCommit.changes).toContainEqual(expect.objectContaining({ componentType: NestedComponent }));
    expect(thirdCommit.changes).not.toContainEqual(expect.objectContaining({ componentType: Screen }));
  });
});
