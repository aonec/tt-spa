import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import fixReactVirtualized from 'esbuild-plugin-react-virtualized';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      App: '/src/App',
      services: '/src/services',
      api: '/src/api',
      css: '/src/css',
      utils: '/src/utils',
      'ui-kit': '/src/ui-kit',
      hooks: '/src/hooks',
      featureToggles: '/src/featureToggles',
      types: '/src/types',
      dictionaries: '/src/dictionaries',
    },
  },
  build: {
    outDir: 'build',
  },
});
