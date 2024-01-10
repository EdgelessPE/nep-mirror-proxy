import typescript from "@rollup/plugin-typescript";
export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.mjs",
    format: "es",
  },
  plugins: [typescript()],
};
