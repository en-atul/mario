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
  viteFinal: async (config, {configType}) => {
    const { mergeConfig } = await import('vite');

    // Add Tailwind CSS v4 plugin to process @theme directives
    config.plugins = config.plugins || [];
    config.plugins.push(
      tailwindcss(),
      generateThemePlugin() // Inject theme CSS from colors.ts
    );
 
    if (configType === 'DEVELOPMENT') {
      // Your development configuration goes here
    }
    if (configType === 'PRODUCTION') {
      // Your production configuration goes here.
    }
    return mergeConfig(config, {
      // Your environment configuration here
    });
  },
  core: {
    disableTelemetry: true,
    // builder: '@storybook/builder-vite',
  },
};
export default config;
