import type { ComponentType } from "react";

// Types extracted from react-devtools-core and react-devtools-shared

export const ElementTypeClass = 1;
export const ElementTypeContext = 2;
export const ElementTypeFunction = 5;
export const ElementTypeForwardRef = 6;
export const ElementTypeHostComponent = 7;
export const ElementTypeMemo = 8;
export const ElementTypeOtherOrUnknown = 9;
export const ElementTypeProfiler = 10;
export const ElementTypeRoot = 11;
export const ElementTypeSuspense = 12;
export const ElementTypeSuspenseList = 13;
export const ElementTypeTracingMarker = 14;
export const ElementTypeVirtual = 15;

// Different types of elements displayed in the Elements tree.
// These types may be used to visually distinguish types,
// or to enable/disable certain functionality.
export type ElementType =
	| 1
	| 2
	| 5
	| 6
	| 7
	| 8
	| 9
	| 10
	| 11
	| 12
	| 13
	| 14
	| 15;

export type ProfilingDataBackend = {
	dataForRoots: Array<ProfilingDataForRootBackend>;
	rendererID: number;
	timelineData: unknown | null;
};

export type ProfilingDataForRootBackend = {
	commitData: Array<CommitDataBackend>;
	displayName: string;
	// Tuple of Fiber ID and base duration
	initialTreeBaseDurations: Array<[number, number]>;
	rootID: number;
};

export type CommitDataBackend = {
	// Tuple of fiber ID and change description
	changeDescriptions: Array<[number, ChangeDescription]> | null;
	duration: number;
	// Only available in certain (newer) React builds,
	effectDuration: number | null;
	// Tuple of fiber ID and actual duration
	fiberActualDurations: Array<[number, number]>;
	// Tuple of fiber ID and computed "self" duration
	fiberSelfDurations: Array<[number, number]>;
	// Only available in certain (newer) React builds,
	passiveEffectDuration: number | null;
	priorityLevel: string | null;
	timestamp: number;
	updaters: Array<SerializedElement> | null;
};

export type ChangeDescription = {
	context: Array<string> | boolean | null;
	didHooksChange: boolean;
	isFirstMount: boolean;
	props: Array<string> | null;
	state: Array<string> | null;
	hooks?: Array<number> | null;
	componentType: ComponentType | null;
};

export type SerializedElement = {
	displayName: string | null;
	id: number;
	key: number | string | null;
	type: ElementType;
};

export type RendererInterface = {
	startProfiling: (
		recordChangeDescriptions: boolean,
		recordTimeline: boolean,
	) => void;
	stopProfiling: () => void;
	getProfilingData(): ProfilingDataBackend;
	getElementSourceFunctionById: (id: number) => null | ComponentType;
	flushInitialOperations: () => void;
};

// Measure API

export type ChangeData = {
	context: string[] | boolean | null;
	didHooksChange: boolean;
	isFirstMount: boolean;
	props: string[] | null;
	state: string[] | null;
	hooks: number[] | null;
	componentType: ComponentType | null;
}

export type CommitData = {
	duration: number;
	priorityLevel: string | null;
	timestamp: number;
	changes: ChangeData[];
}

export type MeasureResult = {
	commits: CommitData[];
	rawProfilingData: ProfilingDataBackend;
	exportProfilingData: () => unknown;
}
