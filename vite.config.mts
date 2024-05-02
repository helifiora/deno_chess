import { resolve } from "@std/path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import "react";
import "react-dom";

export default defineConfig({
  plugins: [react() as any],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve("src"),
      },
    ],
  },
});
