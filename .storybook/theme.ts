import { create } from "storybook/theming";

export default create({
  base: "light",
  brandTitle: "Mario Design System",
  brandUrl: "https://github.com/en-atul/mario",
  brandTarget: "_self",
 

  //
  colorPrimary: '#3A10E5',
  colorSecondary: '#039af4',
 
  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 4,

 
  // Text colors
  textColor: '#10162F',
  textInverseColor: '#ffffff',
 
  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#039af4',
  barHoverColor: '#585C6D',
  barBg: '#ffffff',
 
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e2e8f0',
  inputTextColor: '#10162F',
  inputBorderRadius: 2,
});
