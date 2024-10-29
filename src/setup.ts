import { DevToolsProfilingHooks } from './types.ts';

interface ReactRenderer {
  version: string;
  rendererPackageName: string;
  injectProfilingHooks: (profilingHooks: DevToolsProfilingHooks) => void;
}

let uidCounter = 0;

const devtoolsHook = {
  _renderers: [] as ReactRenderer[],
  supportsFiber: true,
  inject: function (renderer: ReactRenderer) {
    const id = ++uidCounter;
    this._renderers.push(renderer);
    return id;
  },
  onCommitFiberRoot: () => {},
  onCommitFiberUnmount: () => {},
};

global.__REACT_DEVTOOLS_GLOBAL_HOOK__ = devtoolsHook;
