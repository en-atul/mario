import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.tsx", 
    "./src/**/*.ts", 
    "./src/**/*.mdx",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  // Colors and theme are now defined in src/index.css using @theme directive
  // This is the Tailwind CSS v4 CSS-first configuration approach
} satisfies Config;
