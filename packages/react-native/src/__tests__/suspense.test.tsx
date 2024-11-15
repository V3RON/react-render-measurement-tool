import React, { Suspense } from "react";
import { Text, View } from "react-native";
import { measure } from "..";

describe("[React Native] Suspense", () => {
  it("should count React.lazy re-renders", async () => {
    const LazyLoadedComponent = () => {
      return <Text>Lazy loaded!</Text>;
    };

    const LazyComponent = React.lazy<typeof LazyLoadedComponent>(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ default: LazyLoadedComponent }), 0);
        }),
    );

    const { commits } = await measure(
      <View>
        <Suspense fallback={<Text>Loading</Text>}>
          <LazyComponent />
        </Suspense>
      </View>,
      {
        scenario: async (screen) => {
          await screen.findByText("Lazy loaded!");
        },
      },
    );

    expect(commits).toHaveLength(2);
    expect(commits[0].changes).not.toContainEqual(expect.objectContaining({ componentType: LazyLoadedComponent }));
    expect(commits[1].changes).toContainEqual(expect.objectContaining({ componentType: LazyLoadedComponent }));
  });
});
