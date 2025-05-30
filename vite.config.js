import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [dts({ rollupTypes: false })],
  build: {
    outDir: 'dist',
    target: 'esnext',
    emptyOutDir: true,
    minify: false,
    lib: {
      name: 'prototypeDom',
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['iife'],
      fileName: 'index',
    },
  },
});
