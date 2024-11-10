# React Render Measurement Tool

## Overview

The React Render Measurement Tool is an experimental utility designed to gather detailed information about React component renders while executing tests. This tool helps developers understand the rendering behavior of their React applications by tracking the number of renders and storing references to the rendered components.

> **Note:** This tool is currently a work in progress and is not available on npm. There is no straightforward way to install or use it at this time.

## Features

- **Render counting:** Count all renders of the provided `ReactElement`.
- **Component tracking:** Store references to all rendered components.
- **Scenario execution:** Execute actions (such as clicking buttons) that may trigger additional renders, with the ability to record those renders.

## Usage

To use the `measure` function from this tool, follow the instructions below:

## Installation

1. Install the package using your favorite package manager:

   ```bash
   # Using npm
   npm install react-render-measurement-tool
  
   # Using yarn
   yarn add react-render-measurement-tool
  
   # Using pnpm
   pnpm add react-render-measurement-tool
   ```

2. Import the setup file in your Jest or Vitest setup file:

   ```javascript
   import 'react-render-measurement-tool/setup';
   ```

3. Use the `measure` function to gather profiling data by passing a `scenario`:

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

4. You can assert the profiling results. For example, to check if a component was rendered:

   ```javascript
   expect(result.commits).toHaveLength(2);
   expect(result.commits[0].changes).toContainEqual(
     expect.objectContaining({ componentType: Componnet })
   );
   ```

### API

#### `measure(ui, options)`

- **Parameters:**
    - `ui`: The React element to render.
    - `options` (optional): An object to configure the measurement, such as defining scenarios to execute.

- **Returns:**
    - An array containing objects of the `MeasureResult` type, which includes details about the render metrics.

## Contributing

Contributions to this tool are welcome! If you have ideas, suggestions, or bug reports, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
