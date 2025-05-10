import '@testing-library/jest-dom/vitest';

Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_CTP_CLIENT_ID: 'test-id',
    VITE_CTP_CLIENT_SECRET: 'secret',
    VITE_CTP_SCOPES: 'scope scope',
    VITE_CTP_PROJECT_KEY: 'key',
    VITE_CTP_API_URL: 'url',
    VITE_CTP_AUTH_URL: 'url',
  },
});
