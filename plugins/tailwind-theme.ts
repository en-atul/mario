import type { Plugin } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import { generateThemeCSS } from "../src/utils/generate-theme.ts";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export function generateThemePlugin(): Plugin {
  const cssFile = path.resolve(dirname, "../src/styles/colors.css");

  return {
    name: "generate-theme-css",
    enforce: "pre",

    async config(_, { command }) {
      if (command !== "serve" && command !== "build") return;

      const css = generateThemeCSS();

      await writeFileIfChanged(cssFile, css);
    },
  };
}

async function writeFileIfChanged(filePath: string, content: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    const existing = await fs.readFile(filePath, "utf8");
    if (existing === content) return; // no-op if unchanged
  } catch {
    // file does not exist → will be created
  }

  await fs.writeFile(filePath, content, "utf8");
}
