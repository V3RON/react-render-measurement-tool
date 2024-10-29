import { ComponentType } from 'react';

export type WorkTag = {};
export type Lane = {};
export type Fiber = {
  tag: WorkTag,
  key: null | string,
  elementType: any,
  type: any,
  stateNode: any,
  return: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,
  ref: unknown;
  refCleanup: null | (() => void),
  pendingProps: unknown,
  memoizedProps: unknown,
  updateQueue: unknown,
  memoizedState: unknown,
  dependencies: unknown | null,
  mode: unknown,
  flags: unknown,
  subtreeFlags: unknown,
  deletions: Array<Fiber> | null,
  lanes: Lanes,
  childLanes: Lanes,
  alternate: Fiber | null,
  actualDuration?: number,
  actualStartTime?: number,
  selfBaseDuration?: number,
  treeBaseDuration?: number,
  _debugInfo?: unknown | null,
  _debugOwner?: unknown | Fiber | null,
  _debugStack?: string | Error | null,
  _debugTask?: unknown | null,
  _debugIsCurrentlyTiming?: boolean,
  _debugNeedsRemount?: boolean,
  _debugHookTypes?: Array<unknown> | null,
};
export type Lanes = {};
export type Wakeable = {};

export type DevToolsProfilingHooks = {
  markRenderScheduled?: (lane: Lane) => void,
  markStateUpdateScheduled?: (fiber: Fiber, lane: Lane) => void,
  markForceUpdateScheduled?: (fiber: Fiber, lane: Lane) => void,
  markRenderStarted?: (lanes: Lanes) => void,
  markRenderYielded?: () => void,
  markRenderStopped?: () => void,
  markCommitStarted?: (lanes: Lanes) => void,
  markCommitStopped?: () => void,
  markLayoutEffectsStarted?: (lanes: Lanes) => void,
  markLayoutEffectsStopped?: () => void,
  markPassiveEffectsStarted?: (lanes: Lanes) => void,
  markPassiveEffectsStopped?: () => void,
  markComponentRenderStarted?: (fiber: Fiber) => void,
  markComponentRenderStopped?: () => void,
  markComponentErrored?: (fiber: Fiber, thrownValue: unknown, lanes: Lanes) => void,
  markComponentSuspended?: (fiber: Fiber, wakeable: Wakeable, lanes: Lanes) => void,
  markComponentLayoutEffectMountStarted?: (fiber: Fiber) => void,
  markComponentLayoutEffectMountStopped?: () => void,
  markComponentLayoutEffectUnmountStarted?: (fiber: Fiber) => void,
  markComponentLayoutEffectUnmountStopped?: () => void,
  markComponentPassiveEffectMountStarted?: (fiber: Fiber) => void,
  markComponentPassiveEffectMountStopped?: () => void,
  markComponentPassiveEffectUnmountStarted?: (fiber: Fiber) => void,
  markComponentPassiveEffectUnmountStopped?: () => void,
}

export type ProfilingData = {
  start: number;
  stop: number;
  duration: number;
  lanes: Lanes;
  components: ComponentType[];
};
