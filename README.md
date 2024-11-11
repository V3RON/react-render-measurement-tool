# React Render Measurement Tool

## Overview

The React Render Measurement Tool is an experimental utility designed to provide insights into React component rendering behavior during test execution. By counting renders and tracking references to rendered components, this tool helps developers better understand and optimize their React applications.

> **Note:** This tool is currently under active development and is not yet available on npm, so installation and usage options are limited.

## Features

- **Render Counting:** Tracks the number of renders for the specified `ReactElement`.
- **Component Tracking:** Stores references to all rendered components for easy inspection.
- **Scenario Execution:** Allows execution of actions (e.g., button clicks) that may trigger re-renders, with the ability to monitor and record these renders.

## Usage

Follow the steps below to use the `measure` function and gather render profiling data:

### Installation

1. Add the package via your preferred package manager:

   ```bash
   # npm
   npm install react-render-measurement-tool
  
   # yarn
   yarn add react-render-measurement-tool
  
   # pnpm
   pnpm add react-render-measurement-tool
   ```

2. Import the setup file in your Jest or Vitest configuration:

   ```javascript
   import 'react-render-measurement-tool/setup';
   ```

3. Use the `measure` function to capture render metrics by specifying a `scenario`:

    ```javascript
    import userEvent from '@testing-library/user-event';
    import { useState } from 'react';
    import { measure } from 'react-render-measurement-tool';
    
    it('should render twice', async () => {
      const Component = () => {
        const [value, setValue] = useState(0);
    
        return (
          <button onClick={() => setValue(v => v + 1)}>
            Re-render
          </button>
        );
      };
    
      const result = await measure(<Component />, {
        scenario: async (screen) => {
          await userEvent.click(screen.getByText('Re-render'));
        },
      });
    
      expect(result.commits).toHaveLength(2);
    });
    ```

4. Assert the profiling results. For example, to verify that a component rendered twice:

   ```javascript
   expect(result.commits).toHaveLength(2);
   expect(result.commits[0].changes).toContainEqual(
     expect.objectContaining({ componentType: Component })
   );
   ```

### API

#### `measure(ui, options)`

- **Parameters:**
    - `ui`: The React element to be rendered.
    - `options` (optional): An object to customize the measurement, including the option to define scenarios for testing.

- **Returns:**
    - An array of `MeasureResult` objects, each containing detailed render metrics.

## Contributing

Contributions are welcome! If you have ideas, suggestions, or encounter issues, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
