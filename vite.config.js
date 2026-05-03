import { resolve } from 'node:path';
import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [dts({ rollupTypes: false })],
  build: {
    outDir: 'dist',
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
