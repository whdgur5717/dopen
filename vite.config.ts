/// <reference types="vitest" />
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [TanStackRouterVite(), tsconfigPaths(), react()],
  build: {
    minify: true,
    rollupOptions: {
      output: {
        // manualChunks: (id) => {
        //   if (id.indexOf('node_modules') !== -1) {
        //     const module = id.split('node_modules/').pop().split('/')[0];
        //     return `vendor-${module}`;
        //   }
        // },
      },
    },
  },
  test: {
    browser: {
      enabled: true,
      name: 'chromium', // browser name is required
    },
  },
});
