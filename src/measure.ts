import { type RenderResult, render } from "@testing-library/react";
import type * as React from "react";
import {
	MeasureResult,
	RendererInterface,
} from './types';

const getRendererInterface = (): RendererInterface => {
	const hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;

	if (
		!hook ||
		typeof hook !== "object" ||
		!("rendererInterfaces" in hook) ||
		!(hook.rendererInterfaces instanceof Map)
	) {
		throw new Error(
			"Value of __REACT_DEVTOOLS_GLOBAL_HOOK__ is different than expected.",
		);
	}

	const devTools = hook.rendererInterfaces.get(1);

	if (!devTools) {
		throw new Error("Invalid renderer detected.");
	}

	return devTools as RendererInterface;
};

const getOperations = (devTools: RendererInterface): number[][] => {
	const operations: number[][] = [];

	const unsubscribe = __REACT_DEVTOOLS_GLOBAL_HOOK__.sub('operations', (data) => {
		operations.push(data);
	});
	devTools.flushInitialOperations();

	unsubscribe();
	return operations;
}

export interface MeasureOptions {
	scenario?: (screen: RenderResult) => Promise<void>;
}

export const measure = async (
	ui: React.ReactElement,
	options?: MeasureOptions,
): Promise<MeasureResult> => {
	const devTools = getRendererInterface();

	devTools.startProfiling(true, true);
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
		commits: rootData.commitData.map(commit => ({
			changes: commit.changeDescriptions ? commit.changeDescriptions.map(([fiberId, change]) => ({
				isFirstMount: change.isFirstMount,
				didHooksChange: change.didHooksChange,
				props: change.props,
				state: change.state,
				hooks: change.hooks ?? null,
				context: change.context,
				componentType: devTools.getElementSourceFunctionById(fiberId),
			})) : [],
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
				}
			],
			timelineData: undefined,
		}),
	};
};
