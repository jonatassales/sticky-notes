import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: {
    "ui/index": "src/ui/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  ...options,
}));
