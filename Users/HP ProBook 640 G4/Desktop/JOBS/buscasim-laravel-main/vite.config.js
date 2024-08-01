import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/src/index.tsx'],
      refresh: true,
    }),
    react(),
  ],
  build: {
    outDir: 'public/build',
    rollupOptions: {
    }
  },
  resolve: {
    alias: {
      '@': '/resources/src',
    },
  },
});
