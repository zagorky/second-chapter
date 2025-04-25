import { defineConfig } from 'vite'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~components': path.resolve(__dirname, './src/components'),
      '~config': path.resolve(__dirname, './src/config'),
      '~features': path.resolve(__dirname, './src/features'),
      '~hooks': path.resolve(__dirname, './src/hooks'),
      '~lib': path.resolve(__dirname, './src/lib'),
      '~stores': path.resolve(__dirname, './src/stores'),
      '~testing': path.resolve(__dirname, './src/testing'),
      '~types': path.resolve(__dirname, './src/types'),
      '~utils': path.resolve(__dirname, './src/utils'),
      '~app': path.resolve(__dirname, './src/app'),


    },
  },
  build: {
    minify: true,
    target: 'esnext',
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  plugins: [react(), tailwindcss(),],
})
