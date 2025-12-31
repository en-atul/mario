import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { generateThemePlugin } from "../plugins/tailwind-theme.ts";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite",
  viteFinal: async (config) => {
    // Add Tailwind CSS v4 plugin to process @theme directives
    config.plugins = config.plugins || [];
    config.plugins.push(
      tailwindcss(),
      generateThemePlugin() // Inject theme CSS from colors.ts
    );
    return config;
  },
  core:{
    disableTelemetry: true,
  },
};
export default config;
