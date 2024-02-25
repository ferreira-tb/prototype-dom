import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  plugins: [typescript()],
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    generatedCode: 'es2015'
  }
});
