declare global {
	declare var __REACT_DEVTOOLS_GLOBAL_HOOK__: {
		rendererInterfaces: Map<number, unknown>;
		sub: (event: string, handler: (data: any) => void) => () => void,
	};
}

export {};
