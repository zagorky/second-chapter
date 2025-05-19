import { defineConfig, mergeConfig } from 'vitest/config';
import config from './vite.config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default mergeConfig(
  config,
  defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './vitest.setupTests.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        reportsDirectory: './coverage',
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['node_modules/**'],
        all: true,
      },
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
  })
);
