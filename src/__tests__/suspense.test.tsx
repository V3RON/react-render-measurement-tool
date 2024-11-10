import React, { Suspense } from "react";
import { describe, expect, it } from "vitest";
import { measure } from "../measure";

describe("Suspense", () => {
	it("should count React.lazy re-renders", async () => {
		const LazyLoadedComponent = () => {
			return <div>Lazy loaded!</div>;
		};

		const LazyComponent = React.lazy<typeof LazyLoadedComponent>(
			() =>
				new Promise((resolve) => {
					setTimeout(() => resolve({ default: LazyLoadedComponent }), 0);
				}),
		);

		const { commits } = await measure(
			<Suspense fallback={<div>Loading</div>}>
				<LazyComponent />
			</Suspense>,
			{
				scenario: async (screen) => {
					await screen.findByText("Lazy loaded!");
				},
			},
		);

		expect(commits).toHaveLength(2);
		expect(commits[0].changes).not.toContainEqual(
			expect.objectContaining({ componentType: LazyLoadedComponent }),
		);
		expect(commits[1].changes).toContainEqual(
			expect.objectContaining({ componentType: LazyLoadedComponent }),
		);
	});
});
