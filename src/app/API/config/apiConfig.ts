const ENV = {
  AUTH_URL: import.meta.env.VITE_CTP_AUTH_URL,
  API_URL: import.meta.env.VITE_CTP_API_URL,
  PROJECT_KEY: import.meta.env.VITE_CTP_PROJECT_KEY,
  CLIENT_ID: import.meta.env.VITE_CTP_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_CTP_CLIENT_SECRET,
};

const ANONYMOUS_SCOPES = ['create_anonymous_token', 'view_categories', 'view_published_products'] as const;

const PASSWORD_ONLY_SCOPES = [
  'manage_my_shopping_lists',
  'manage_my_payments',
  'manage_my_quote_requests',
  'manage_my_quotes',
  'manage_my_business_units',
  'manage_my_orders',
  'manage_my_profile',
] as const;

type ScopeType = (typeof ANONYMOUS_SCOPES)[number] | (typeof PASSWORD_ONLY_SCOPES)[number];

const getScopeWithKey = (scopeName: ScopeType) => `${scopeName}:${ENV.PROJECT_KEY}`;

const ANONYMOUS_SCOPES_WITH_KEYS = ANONYMOUS_SCOPES.map(getScopeWithKey);
const PASSWORD_SCOPES_WITH_KEYS = [...ANONYMOUS_SCOPES_WITH_KEYS, ...PASSWORD_ONLY_SCOPES.map(getScopeWithKey)];

const LS_KEY = 'keep-it-stupid-and-insecure';

export const API_CONFIG = { ...ENV, ANONYMOUS_SCOPES_WITH_KEYS, PASSWORD_SCOPES_WITH_KEYS, LS_KEY };
