import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // '@components': path.resolve(__dirname, './src/components'),
      // '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
