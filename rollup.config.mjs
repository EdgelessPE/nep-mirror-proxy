import typescript from "@rollup/plugin-typescript";
export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.cjs",
    format: "commonjs",
  },
  plugins: [typescript()],
};
