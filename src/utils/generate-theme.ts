import {
  colors,
  white,
  black, 
  transparent,
  currentColor,
} from "../tokens/colors.ts";

/**
 * Generates Tailwind CSS v4 @theme block from color tokens
 * This maintains a single source of truth in colors.ts
 */
export function generateThemeCSS(): string {
  let css =
    "/* This file is generated automatically. Do not edit for changes to take effect. */\n\n\n";

  css += "@theme {\n";

  // Generate color variables from colors object
  for (const [colorName, colorShades] of Object.entries(colors)) {
    css += `\n/* --- ${colorName} ---- */\n`;

    for (const [shade, value] of Object.entries(colorShades)) {
      css += `  --color-${colorName}-${shade}: ${value};\n`;
    }
  }

  // Add base colors
  css += `\n/* --- Base Colors ---- */\n`;
  css += `  --color-white: ${white};\n`;
  css += `  --color-black: ${black};\n`;
  css += `  --color-transparent: ${transparent};\n`;
  css += `  --color-current: ${currentColor};\n`;

  // Add font family
  css += `\n/* --- Font Families ---- */\n`;
  css += `  --font-family-sans: "Inter Variable", sans-serif;\n`;

  css += "}";

  return css;
}
