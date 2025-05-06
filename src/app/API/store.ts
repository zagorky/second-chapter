import type { TokenCacheOptions } from '@commercetools/ts-client';

import { z } from 'zod';

import { API_CONFIG } from './apiConfig';

const TokenStoreSchema = z.object({
  token: z.string(),
  expirationTime: z.number(),
  refreshToken: z.string().optional(),

  tokenCacheKey: z.custom<TokenCacheOptions>().optional(),
});

const StoreSchema = z.object({
  isAuthenticated: z.boolean(),
  tokenStore: TokenStoreSchema,
});

type Store = z.infer<typeof StoreSchema>;

const validateStore = (raw: unknown) => {
  if (!raw) return;
  const result = StoreSchema.safeParse(raw);

  if (result.success) {
    return result.data;
  } else {
    console.error(result.error);
  }
};
const retrieveStoreFromLS = (): Store | undefined => {
  const raw = localStorage.getItem(API_CONFIG.LS_KEY);
  const result = validateStore(raw);

  if (result) return result;
};

export const AppStore = {
  isAuthenticated: retrieveStoreFromLS()?.isAuthenticated ?? false,
  tokenStore: retrieveStoreFromLS()?.tokenStore,
};
