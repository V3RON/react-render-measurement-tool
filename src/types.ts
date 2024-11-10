import type { ComponentType } from "react";
import type { ProfilingDataBackend } from "react-devtools-inline";

export type ChangeData = {
	context: string[] | boolean | null;
	didHooksChange: boolean;
	isFirstMount: boolean;
	props: string[] | null;
	state: string[] | null;
	hooks: number[] | null;
	componentType: ComponentType | null;
};

export type CommitData = {
	duration: number;
	priorityLevel: string | null;
	timestamp: number;
	changes: ChangeData[];
};

export type MeasureResult = {
	commits: CommitData[];
	rawProfilingData: ProfilingDataBackend;
	exportProfilingData: () => unknown;
};
