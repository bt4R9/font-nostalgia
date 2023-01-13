import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  esbuild: {
    minify: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'retrotype',
      formats: ['es', 'umd']
    }
  }
});