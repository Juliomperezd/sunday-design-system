import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  resolve: {
    alias: {
      '@mi-org/design-system/tokens.css': resolve(__dirname, '../design-system/src/tokens/tokens.css'),
      '@mi-org/design-system': resolve(__dirname, '../design-system/src/index.ts'),
    },
  },
});
