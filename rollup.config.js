import { createRequire } from 'module';
const require = createRequire(import.meta.url);import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json' assert { type: 'json'};
import {terser} from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import cjs from "rollup-plugin-cjs-es";
export default {
 input: 'src/index.ts', // our source file
 output: [
  {
   file: pkg.module,
   format: 'es', // the preferred format
   exports: 'named',
   sourcemap: true
  }
 ],
 external: [
  ...Object.keys(pkg.dependencies || {})
 ],
 plugins: [
  typescript({
   typescript: require('typescript'),
  }),
  cjs({
      nested: true
    }),
  resolve(),commonjs(),
  terser() // minifies generated bundles
 ]
};