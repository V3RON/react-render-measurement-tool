import type { ComponentType } from 'react';

declare module 'react-devtools-inline' {
  export interface RendererInterface {
    getElementSourceFunctionById: (id: number) => null | ComponentType;
    getDisplayNameForElementID: (id: number) => null | string;
  }
}
