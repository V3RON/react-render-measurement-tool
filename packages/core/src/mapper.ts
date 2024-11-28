import type { ProfilingDataForRootBackend, RendererInterface } from 'react-devtools-inline';
import type { CommitData, MeasureSummary } from './types';

export const getSummary = (profilingData: ProfilingDataForRootBackend): MeasureSummary => {
  return {
    totalDuration: profilingData.commitData.reduce((sum, commit) => sum + commit.duration, 0),
    commitCount: profilingData.commitData.length,
    componentUpdateCount: profilingData.commitData.reduce((sum, commit) => {
      const changeDescriptions = commit.changeDescriptions ?? [];
      return sum + changeDescriptions.length;
    }, 0),
  };
};

export const getCommits = (devTools: RendererInterface, profilingData: ProfilingDataForRootBackend): CommitData[] => {
  return profilingData.commitData.map((commit) => {
    const changes = (commit.changeDescriptions ?? []).map(([fiberId, change]) => ({
      componentName: devTools.getDisplayNameForElementID(fiberId) ?? 'Unknown',
      isFirstMount: change.isFirstMount,
      didHooksChange: change.didHooksChange,
      props: change.props,
      state: change.state,
      hooks: change.hooks ?? null,
      context: !!change.context,
      componentType: devTools.getElementSourceFunctionById(fiberId),
    }));

    const updaters =
      commit.updaters?.map((updater) => ({
        componentType: devTools.getElementSourceFunctionById(updater.id),
        componentName: updater.displayName ?? 'Unknown',
      })) ?? [];

    return {
      changes,
      timestamp: commit.timestamp,
      duration: commit.duration,
      relativeTimestamp: commit.timestamp - profilingData.commitData[0].timestamp,
      updaters,
    };
  });
};
