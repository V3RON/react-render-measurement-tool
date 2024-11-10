import { type RenderResult, render } from "@testing-library/react";
import type * as React from "react";
import { getOperations, getRendererInterface } from "./devtools.ts";
import type { MeasureResult } from "./types";

export interface MeasureOptions {
	scenario?: (screen: RenderResult) => Promise<void>;
}

export const measure = async (
	ui: React.ReactElement,
	options?: MeasureOptions,
): Promise<MeasureResult> => {
	const devTools = getRendererInterface();

	devTools.startProfiling(true);
	const renderResult = render(ui);

	if (options?.scenario) {
		await options.scenario(renderResult);
	}

	devTools.stopProfiling();

	const profilingData = devTools.getProfilingData();
	const operations = getOperations(devTools);

	console.assert(profilingData.dataForRoots.length === 1);
	const rootData = profilingData.dataForRoots[0];

	return {
		rawProfilingData: profilingData,
		commits: rootData.commitData.map((commit) => ({
			changes: commit.changeDescriptions
				? commit.changeDescriptions.map(([fiberId, change]) => ({
						isFirstMount: change.isFirstMount,
						didHooksChange: change.didHooksChange,
						props: change.props,
						state: change.state,
						hooks: change.hooks ?? null,
						context: change.context,
						componentType: devTools.getElementSourceFunctionById(fiberId),
					}))
				: [],
			timestamp: commit.timestamp,
			duration: commit.duration,
			priorityLevel: commit.priorityLevel,
		})),
		exportProfilingData: () => ({
			version: 5,
			dataForRoots: [
				{
					...rootData,
					operations,
				},
			],
			timelineData: undefined,
		}),
	};
};
