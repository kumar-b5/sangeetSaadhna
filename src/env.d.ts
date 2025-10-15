/// <reference path="../.astro/types.d.ts" />

declare module 'sanity' {
  export const defineConfig: (...args: any[]) => any;
  export const defineField: (...args: any[]) => any;
  export const defineType: (...args: any[]) => any;
  export const defineArrayMember: (...args: any[]) => any;
}

declare module 'sanity/structure' {
  export const structureTool: (...args: any[]) => any;
}
