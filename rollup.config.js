import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import {terser} from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
export default {
 input: 'src/index.ts', // our source file
 output: [
  {
   file: pkg.main,
   format: 'cjs',
   exports: 'named',
   sourcemap: true
  },
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
  resolve(),
  terser() // minifies generated bundles
 ]
};