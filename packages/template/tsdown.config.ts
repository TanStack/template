import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts', './src/types.ts'],
  format: ['esm'],
  target: 'es2022',
  unbundle: true,
  dts: true,
  sourcemap: false,
  clean: true,
  minify: false,
  fixedExtension: false,
  exports: true,
  publint: {
    strict: true,
  },
})
