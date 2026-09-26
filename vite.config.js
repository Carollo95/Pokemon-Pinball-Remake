import { cpSync } from "node:fs";
import { defineConfig } from "vite";

export default defineConfig({
  // Relative URLs so the build works under any sub-path
  base: "./",
  plugins: [
    {
      name: "copy-game-assets",
      apply: "build",
      closeBundle() {
        cpSync("assets", "dist/assets", { recursive: true });
      }
    }
  ]
});
