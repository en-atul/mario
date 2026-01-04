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
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#0f172a",
        },
        {
          name: "gray",
          value: "#f1f5f9",
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1280px",
            height: "720px",
          },
        },
      },
    },
    a11y: {
      test: "todo",
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Tokens",
          ["Colors", "Typography", "Spacing", "Radius", "Elevation", "Motion", "Icons"],
          "Components",
          [
            "Forms",
            [
              "Input",
              "TextArea",
              "Select",
              ["Select", "SelectAsync"],
              "Checkbox",
              "Radio",
              "Switch",
              "Label",
            ],
            "Actions",
            ["Button", "Link"],
            "Feedback",
            ["Toast", "Tooltip", "Badge", "Skeleton"],
            "Layout",
            ["Separator", "Typography"],
            "Overlays",
            ["Modal", "Dialog", "Dropdown"],
            "Navigation",
            ["Tabs"],
          ],
        ],
      },
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
