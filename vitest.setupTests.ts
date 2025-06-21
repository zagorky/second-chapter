import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.stubEnv('VITE_CTP_CLIENT_ID', 'test-id');
vi.stubEnv('VITE_CTP_CLIENT_SECRET', 'secret');
vi.stubEnv('VITE_CTP_SCOPES', 'scope scope');
vi.stubEnv('VITE_CTP_PROJECT_KEY', 'key');
vi.stubEnv('VITE_CTP_API_URL', 'url');
vi.stubEnv('VITE_CTP_AUTH_URL', 'url');
