import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Thêm dòng này

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@store': path.resolve(__dirname, './src/store'),
      '@apis': path.resolve(__dirname, './src/apis'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
    },
  },
});
