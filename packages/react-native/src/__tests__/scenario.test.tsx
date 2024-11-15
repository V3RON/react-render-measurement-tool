import { Text } from "react-native";
import { type MeasureOptions, measure } from "..";

const UI = <Text>Test component</Text>;

describe("[React Native] Scenario", () => {
  it("should call the provided scenario function with the RenderResult", async () => {
    const mockScenario = jest.fn(() => Promise.resolve());
    const options: MeasureOptions = { scenario: mockScenario };

    await measure(UI, options);

    expect(mockScenario).toHaveBeenCalledWith(expect.any(Object));
    expect(mockScenario).toHaveBeenCalledTimes(1);
  });

  it("should support async operations within the scenario function", async () => {
    const mockScenario = jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    const options: MeasureOptions = { scenario: mockScenario };

    await measure(UI, options);

    expect(mockScenario).toHaveBeenCalledTimes(1);
  });
});
