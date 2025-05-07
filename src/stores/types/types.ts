import type { TokenCacheOptions } from '@commercetools/ts-client';

import { z } from 'zod';

const TokenStoreSchema = z.object({
  token: z.string(),
  expirationTime: z.number(),
  refreshToken: z.string().optional(),

  tokenCacheKey: z.custom<TokenCacheOptions>().optional(),
});

type TokenStore = z.infer<typeof TokenStoreSchema>;

export const ZustandStoreSchema = z.object({
  state: z.object({
    isAuthenticated: z.boolean(),
    store: TokenStoreSchema.optional(),
  }),
});

export type StateStore = {
  isAuthenticated: boolean;
  store?: TokenStore;
  getIsAuthenticated: () => boolean;
  setIsAuthenticated: (next: boolean) => void;
  getStore: () => TokenStore | undefined;
  setStore: (nextStore?: TokenStore) => void;
};
