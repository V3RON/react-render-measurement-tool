<div align="center">

# 🔍 React Render Measurement Tool

[![Version](https://img.shields.io/npm/v/@react-render-measurement-tool/core?color=blue&label=version)](https://www.npmjs.com/package/@react-render-measurement-tool/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/V3RON/react-render-measurement-tool/pulls)

### Measure React component rendering with precision 📊

<p align="center">
  <strong>Debug • Profile • Optimize</strong>
  <br />
  <sub>A powerful tool for understanding how your React components render during tests.</sub>
</p>

[Getting Started](#-getting-started) •
[Features](#-key-features) •
[Documentation](#-api-reference) •
[Contributing](#-contributing)

---

</div>

## ✨ What is it?

A powerful developer tool that helps you understand and optimize how your React components render during tests. Get detailed insights into render counts, component behavior, and performance metrics - all within your testing environment.

> 🚧 **Beta Notice:** This project is under active development and not yet available on npm. Stay tuned for the first release!

## 🎯 Key Features

- 📊 **Precise Render Tracking:** Count and analyze component renders with accuracy
- 🔄 **Component Reference Tracking:** Keep tabs on all rendered components
- 🎬 **Scenario Testing:** Measure performance during user interactions and state changes
- 📈 **Detailed Metrics:** Get comprehensive data about component updates and timing

## 🚀 Getting Started

### 1. Installation

Choose the package that matches your environment:

**For React Web:**
```bash
# npm
npm install @react-render-measurement-tool/react

# yarn
yarn add @react-render-measurement-tool/react

# pnpm
pnpm add @react-render-measurement-tool/react
```

**For React Native:**
```bash
# npm
npm install @react-render-measurement-tool/react-native

# yarn
yarn add @react-render-measurement-tool/react-native

# pnpm
pnpm add @react-render-measurement-tool/react-native
```

### 2. Setup

Add the setup file to your test configuration:

**For React Web:**
```javascript
import '@react-render-measurement-tool/react/setup';
```

**For React Native:**
```javascript
import '@react-render-measurement-tool/react-native/setup';
```

### 3. Usage

Import from the appropriate package based on your environment:

```typescript
// For React Web
import { measure } from '@react-render-measurement-tool/react';

// For React Native
import { measure } from '@react-render-measurement-tool/react-native';
```

Here's a quick example of measuring render performance:

```typescript
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { measure } from '@react-render-measurement-tool/react';

it('tracks re-renders after state changes', async () => {
  const Counter = () => {
    const [count, setCount] = useState(0);
    return (
      <button onClick={() => setCount(v => v + 1)}>
        Count: {count}
      </button>
    );
  };

  const result = await measure(<Counter />, {
    scenario: async (screen) => {
      await userEvent.click(screen.getByRole('button'));
    },
  });

  expect(result.commits).toHaveLength(2); // Initial render + click update
});
```

## 📦 Package Structure

The tool consists of three packages:
- `@react-render-measurement-tool/core`: Core functionality and DevTools integration
- `@react-render-measurement-tool/react`: React Web specific implementation
- `@react-render-measurement-tool/react-native`: React Native specific implementation

## 📖 API Reference

### `measure(ui, options)`

Measures rendering performance of a React component.

**Parameters:**
- `ui`: `ReactElement` - The component to measure
- `options`: (Optional)
  - `scenario`: Function to execute actions after initial render

**Returns:**
- `Promise<MeasureResult>` containing:
  - `commits`: Detailed render information
  - `rawProfilingData`: Raw performance metrics
  - `exportProfilingData`: Function to export DevTools-compatible data

## 🤝 Contributing

We love contributions! Whether it's:
- 🐛 Bug reports
- 💡 Feature suggestions
- 📝 Documentation improvements
- 🔧 Code contributions

Feel free to open an issue or submit a PR!

## 📄 License

MIT Licensed. See [LICENSE](LICENSE) for details.
