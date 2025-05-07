import { defineConfig } from 'vitest/config';
import config from './vite.config';
import { mergeConfig } from 'vitest/config';

export default mergeConfig(
  config,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setupTests.ts',
    },
  })
);
