import { userEvent } from "@testing-library/react-native";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { measure } from "./utils";

describe("[React Native] General", () => {
  it("should include initial render", async () => {
    const result = await measure(<div>Test component</div>);

    expect(result.commits).toHaveLength(1);
  });

  it("should catch useState calls", async () => {
    const TestBed = () => {
      const [v, setV] = useState(0);

      return (
        <Pressable accessibilityRole="button" onPress={() => setV((n) => n + 1)}>
          <Text>{v}</Text>
        </Pressable>
      );
    };
    const { commits } = await measure(<TestBed />, {
      scenario: async (screen) => {
        await userEvent.press(screen.getByRole("button"));
      },
    });

    expect(commits).toHaveLength(2);
  });
});
