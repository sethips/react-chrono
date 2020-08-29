import babel from "@rollup/plugin-babel";
// import typescript from "@rollup/plugin-typescript";
import typescript from "rollup-plugin-typescript2";
import common from "@rollup/plugin-commonjs";
import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import buble from "@rollup/plugin-buble";

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: pkg.umd,
      format: "umd",
      exports: "named",
      strict: true,
      banner,
      name: "ReactCrono",
      globals: {
        nanoid: "nanoid",
        react: "React",
        "use-debounce": "useDebounce",
        "react-dom": "ReactDOM",
        "styled-components": "styled",
      },
    },
  ],
  plugins: [
    typescript(),
    babel({
      extensions: ["tsx", "ts"],
      babelHelpers: "runtime",
      plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-optional-chaining",
      ],
    }),
    buble({
      objectAssign: true,
      transforms: {
        templateString: false
      }
    }),
    common(),
    resolve(),
  ],
  external: [
    "react",
    "react-dom",
    "nanoid",
    "use-debounce",
    "styled-components",
    "@babel/runtime",
  ],
};
