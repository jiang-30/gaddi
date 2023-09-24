import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
// @rollup/plugin-terser
// @rollup/plugin-node-resolve // 将依赖的库也打包

export default {
  input: "src/index.ts",
  output: [
    {
      format: "es",
      dir: "es",
      entryFileNames: "[name].js",
    },
    {
      format: "cjs",
      dir: "lib",
      entryFileNames: "[name].js",
    },
  ],
  plugins: [
    typescript({
      strict: false,
      noImplicitAny: false,
      noEmitOnError: true,
      allowJs: true,
    }),
    commonjs(),
    json(),
  ],
};
