import fs from "node:fs";
import userEvent from "@testing-library/user-event";
import React, { Suspense, useState } from "react";
import { measure } from "react-render-measurement-tool";
import { expect, it } from "vitest";

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

it("should count renders", async () => {
	const { commits, exportProfilingData } = await measure(<Screen />, {
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
	expect(thirdCommit.changes).toContainEqual(
		expect.objectContaining({ componentType: NestedComponent }),
	);
	expect(thirdCommit.changes).not.toContainEqual(
		expect.objectContaining({ componentType: Screen }),
	);

	fs.writeFileSync(
		"./profile.json",
		JSON.stringify(exportProfilingData(), null, 2),
	);
});

const LazyLoadedComponent = () => {
	return <div>Lazy loaded!</div>;
};

const LazyComponent = React.lazy<typeof LazyLoadedComponent>(
	() =>
		new Promise((resolve) => {
			setTimeout(() => resolve({ default: LazyLoadedComponent }), 2000);
		}),
);

it("should work just fine with React.lazy", async () => {
	const { commits, exportProfilingData } = await measure(
		<Suspense fallback={<div>Loading</div>}>
			<LazyComponent />
		</Suspense>,
		{
			scenario: async (screen) => {
				await screen.findByText("Lazy loaded!", {}, { timeout: 5000 });
			},
		},
	);

	expect(commits).toHaveLength(2);
	fs.writeFileSync(
		"./profile.json",
		JSON.stringify(exportProfilingData(), null, 2),
	);
});
