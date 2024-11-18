import type { ChangeData } from '@react-render-measurement-tool/core';
import { userEvent } from '@testing-library/user-event';
import React, { createContext, useContext, memo, useState } from 'react';
import { describe, expect, it } from 'vitest';
import { measure } from '..';

describe('[React] Detection', () => {
  it('should detect context changes', async () => {
    const Context = createContext(0);
    const Consumer = () => {
      useContext(Context);
      return null;
    };
    const MemoizedConsumer = memo(Consumer);
    const TestBed = ({ value }: { value: number }) => {
      return (
        <Context.Provider value={value}>
          <MemoizedConsumer />
        </Context.Provider>
      );
    };

    const { commits } = await measure(<TestBed value={0} />, {
      scenario: async (result) => {
        result.rerender(<TestBed value={1} />);
      },
    });

    expect(commits).toHaveLength(2);
    const consumerChanges = commits[1].changes.find((change) => change.componentType === Consumer) as ChangeData;
    expect(consumerChanges).toBeDefined();
    expect(consumerChanges.context).toBeTruthy();
    expect(consumerChanges.didHooksChange).toBeFalsy();
  });

  it('should detect props changes', async () => {
    const Component = ({ value }: { value: number }) => {
      return null;
    };
    const TestBed = ({ value }: { value: number }) => {
      return <Component value={value} />;
    };

    const { commits } = await measure(<TestBed value={0} />, {
      scenario: async (result) => {
        result.rerender(<TestBed value={1} />);
      },
    });

    expect(commits).toHaveLength(2);
    const componentChanges = commits[1].changes.find((change) => change.componentType === Component) as ChangeData;
    expect(componentChanges).toBeDefined();
    expect(componentChanges.props).toBeTruthy();
    expect(componentChanges.didHooksChange).toBeFalsy();
  });

  it('should detect class component state changes', async () => {
    class Component extends React.Component<unknown, { value: number }> {
      state = {
        value: 0,
      };

      render() {
        return (
          <button type="button" onClick={() => this.setState((state) => ({ value: state.value + 1 }))}>
            {this.state.value}
          </button>
        );
      }
    }

    const { commits } = await measure(<Component />, {
      scenario: async (screen) => {
        await userEvent.click(screen.getByRole('button'));
      },
    });

    expect(commits).toHaveLength(2);
    const componentChanges = commits[1].changes.find((change) => change.componentType === Component) as ChangeData;
    expect(componentChanges).toBeDefined();
    expect(componentChanges.state).toBeTruthy();
    expect(componentChanges.didHooksChange).toBeFalsy();
  });

  it('should detect hook state changes', async () => {
    const Component = () => {
      const [value, setValue] = useState(0);
      return (
        <button type="button" onClick={() => setValue((v) => v + 1)}>
          {value}
        </button>
      );
    };

    const { commits } = await measure(<Component />, {
      scenario: async (screen) => {
        await userEvent.click(screen.getByRole('button'));
      },
    });

    expect(commits).toHaveLength(2);
    const componentChanges = commits[1].changes.find((change) => change.componentType === Component) as ChangeData;
    expect(componentChanges).toBeDefined();
    expect(componentChanges.hooks).toBeTruthy();
    expect(componentChanges.didHooksChange).toBeTruthy();
  });

  it('should correctly identify first mount vs updates', async () => {
    const Component = () => {
      const [value, setValue] = useState(0);
      return (
        <button type="button" onClick={() => setValue((v) => v + 1)}>
          {value}
        </button>
      );
    };

    const { commits } = await measure(<Component />, {
      scenario: async (screen) => {
        await userEvent.click(screen.getByRole('button'));
      },
    });

    expect(commits).toHaveLength(2);

    const firstMountChanges = commits[0].changes.find((change) => change.componentType === Component) as ChangeData;
    expect(firstMountChanges).toBeDefined();
    expect(firstMountChanges.isFirstMount).toBeTruthy();

    const updateChanges = commits[1].changes.find((change) => change.componentType === Component) as ChangeData;
    expect(updateChanges).toBeDefined();
    expect(updateChanges.isFirstMount).toBeFalsy();
  });

  it('should correctly identify component type', async () => {
    const Component = () => {
      return <span>Test</span>;
    };

    const { commits } = await measure(<Component />);

    expect(commits).toHaveLength(1);
    const componentChanges = commits[0].changes.find((change) => change.componentType === Component) as ChangeData;
    expect(componentChanges).toBeDefined();
    expect(componentChanges.componentType).toBe(Component);
  });
});
