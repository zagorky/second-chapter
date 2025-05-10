const ENV = {
  AUTH_URL: import.meta.env.VITE_CTP_AUTH_URL,
  API_URL: import.meta.env.VITE_CTP_API_URL,
  PROJECT_KEY: import.meta.env.VITE_CTP_PROJECT_KEY,
  CLIENT_ID: import.meta.env.VITE_CTP_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_CTP_CLIENT_SECRET,
  SCOPES: import.meta.env.VITE_CTP_SCOPES.split(' '),
};

const LS_KEY = 'keep-it-stupid-and-insecure';

export const API_CONFIG = { ...ENV, LS_KEY };
