import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entryPoints: ["src/index.ts"],
  clean: true,
  format: ["cjs"],
  platform: "node",
  sourcemap: true,
  dts: false,
  ...options,
}));
