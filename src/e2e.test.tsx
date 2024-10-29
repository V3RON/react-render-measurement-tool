import { measure } from './measure.ts';
import userEvent from '@testing-library/user-event'
import { it, expect } from 'vitest'
import { useState } from 'react';

const Screen = () => {
  const [v, setV] = useState(0);

  return (
    <div>
      <button onClick={() => setV(n => n + 1)}>Update Screen</button>
      <span>Screen: {v}</span>

      <NestedComponent />
    </div>
  )
}

const NestedComponent = () => {
  const [v, setV] = useState(0);

  return (
    <div>
      <button onClick={() => setV(n => n + 1)}>Update NestedComponent</button>
      <span>NestedComponent: {v}</span>
    </div>
  )
}

it('should count renders', async () => {
  const stats = await measure(<Screen />, {
    scenario: async (screen) => {
      await userEvent.click(screen.getByText('Update Screen'));

      await userEvent.click(screen.getByText('Update NestedComponent'));
    }
  });

  expect(stats).toHaveLength(3);

  expect(stats[0].components).toHaveLength(2);
  expect(stats[0].components).toContain(Screen);
  expect(stats[0].components).toContain(NestedComponent);

  expect(stats[1].components).toHaveLength(2);
  expect(stats[1].components).toContain(Screen);
  expect(stats[1].components).toContain(NestedComponent);

  expect(stats[2].components).toHaveLength(1);
  expect(stats[2].components).toContain(NestedComponent);
})
