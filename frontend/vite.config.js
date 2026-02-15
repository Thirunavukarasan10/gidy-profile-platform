import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // keep root if deployed at domain root
  build: {
    outDir: 'dist', // default
  },
  server: {
    hmr: false,
  },
});
