import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [dts()],
  build: {
    outDir: 'dist',
    target: 'esnext',
    emptyOutDir: true,
    minify: false,
    lib: {
      name: 'prototypeDom',
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['iife'],
      fileName: 'index',
    },
  },
});
