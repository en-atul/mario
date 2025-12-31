import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    decorators: [
      withThemeByDataAttribute({
        defaultTheme: "light",
        themes: {
          light: "light",
          dark: "dark",
        },
        attributeName: "data-mode",
      }),
    ],
  },
};

export default preview;
