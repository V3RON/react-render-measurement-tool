# React Render Measurement Tool

## Overview

The React Render Measurement Tool is an experimental utility designed to gather detailed information about React component renders while executing tests. This tool helps developers understand the rendering behavior of their React applications by tracking the number of renders and storing references to the rendered components.

> **Note:** This tool is currently a work in progress and is not available on npm. There is no straightforward way to install or use it at this time.

## Features

- **Render Counting:** Count all renders of the provided `ReactElement`.
- **Component Tracking:** Store references to all rendered components.
- **Scenario Execution:** Execute actions (such as clicking buttons) that may trigger additional renders, with the ability to record those renders.

## Usage

To use the `measure` function from this tool, follow the instructions below:

### Installation

*This section is a work in progress.*

### API

#### `measure(ui, options)`

- **Parameters:**
    - `ui`: The React element to render.
    - `options` (optional): An object to configure the measurement, such as defining scenarios to execute.

- **Returns:**
    - An array containing objects of the `ProfilingData` type, which includes details about the render metrics.

## Contributing

Contributions to this tool are welcome! If you have ideas, suggestions, or bug reports, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

This tool is inspired by the need for better visibility into React rendering behavior during tests. Thank you for your interest, and we hope it proves useful in your development workflow!
