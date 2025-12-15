import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//@ts-expect-error Import
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      emitWarning: false,
      include: ['src/**/*.{ts,tsx,js,jsx}'], // Specify the file types to lint
    }),
  ],
  base: '/',
  logLevel: 'info',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Styles
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/utils/shared/_mixins.scss" as *; @use "/src/utils/shared/_variables.scss" as *; @use "/src/utils/shared/_global.scss" as *;  @use "/src/utils/shared/_animate.scss" as *;`,
        api: 'modern-compiler',
      },
    },
  },
});
