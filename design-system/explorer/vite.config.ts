import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname),
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      // Point to the source directly so we don't need to build first
      '@mi-org/design-system': resolve(__dirname, '../src/index.ts'),
    },
  },
  build: {
    outDir: resolve(__dirname, '../dist-explorer'),
    emptyOutDir: true,
  },
});
