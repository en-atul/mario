import { create } from "storybook/theming";

export default create({
  base: "light",
  brandTitle: "Mario Design System",
  brandUrl: "https://github.com/en-atul/mario",
  brandTarget: "_self",
  
  // UI
  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appBorderColor: "#e2e8f0",
  appBorderRadius: 8,
  
  // Text colors
  textColor: "#0f172a",
  textInverseColor: "#ffffff",
  textMutedColor: "#64748b",
  
  // Toolbar default and active colors
  barTextColor: "#64748b",
  barSelectedColor: "#8a55c8",
  barBg: "#f8fafc",
  
  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#cbd5e1",
  inputTextColor: "#0f172a",
  inputBorderRadius: 6,
  
  // Button colors - using lighter purple for better icon visibility
  buttonBg: "#9967d5",
  buttonBorder: "#8a55c8",
  booleanBg: "#f1f5f9",
  booleanSelectedBg: "#8a55c8",
});
