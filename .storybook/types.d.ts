/// <reference types="vite/client" />
/// <reference path="../src/types/custom-elements.d.ts" />

declare module "*.css" {
  const content: string;
  export default content;
}
