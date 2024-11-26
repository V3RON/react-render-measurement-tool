import { userEvent } from '@testing-library/user-event';
import { useState, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { measure } from '../index';

describe('[React] Updaters', () => {
  it('should correctly say which component has caused render', async () => {
    const Second = ({ children }: { children: ReactNode }) => {
      return <div>{children}</div>;
    };
    const TestBed = () => {
      const [state, setState] = useState(0);
      return (
        <>
          <button type="button" onClick={() => setState((n) => n + 1)}>
            Render
          </button>
          <Second>{state}</Second>
        </>
      );
    };

    const result = await measure(<TestBed />, {
      scenario: async (screen) => {
        await userEvent.click(screen.getByRole('button'));
      },
    });

    expect(result.commits).toHaveLength(2);
    expect(result.commits[1].updaters).toHaveLength(1);
    expect(result.commits[1].updaters[0].componentType).toStrictEqual(TestBed);
    expect(result.commits[1].updaters[0].componentName).toStrictEqual('TestBed');
  });

  it('should correctly detect multiple updaters', async () => {
    const store = {
      count: 0,
      listeners: new Set<(count: number) => void>(),
      increment() {
        this.count++;
        this.notifyListeners();
      },
      subscribe(listener: (count: number) => void) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
      },
      notifyListeners() {
        for (const listener of this.listeners) {
          listener(this.count);
        }
      },
    };
    const subscribe = (callback: (count: number) => void) => store.subscribe(callback);
    const getSnapshot = () => store.count;

    const getUpdater = () => () => {
      const counter = useSyncExternalStore(subscribe, getSnapshot);
      return <div>{counter}</div>;
    };

    const Updater1 = getUpdater();
    const Updater2 = getUpdater();
    const Updater3 = getUpdater();

    const TestBed = () => {
      return (
        <>
          <Updater1 />
          <Updater2 />
          <Updater3 />
        </>
      );
    };

    const result = await measure(<TestBed />, {
      scenario: async (screen) => {
        store.increment();
        expect(await screen.findAllByText('1')).toBeTruthy();
      },
    });

    expect(result.commits).toHaveLength(2);
    expect(result.commits[1].updaters).toHaveLength(3);
    expect(result.commits[1].updaters[0].componentType).toStrictEqual(Updater1);
    expect(result.commits[1].updaters[1].componentType).toStrictEqual(Updater2);
    expect(result.commits[1].updaters[2].componentType).toStrictEqual(Updater3);
  });
});
