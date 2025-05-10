import { defineConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

import config from './vite.config';

export default mergeConfig(
  config,
  defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setupTests.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        reportsDirectory: './coverage',
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['node_modules/**'],
        all: true,
      },
    },
  })
);
