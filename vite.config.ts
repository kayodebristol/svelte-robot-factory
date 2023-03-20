import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [
    svelte(),
    typescript({
      target: "esnext",
      rootDir: "src",
      declaration: true,
      declarationDir: "dist",
      lib: ["esnext", "dom"],
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      sourceMap: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "svelte-robot-factory",
      formats: ["es"],
      fileName: "index.es",
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
