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
    refreshToken: z.string().optional(),
    tokenStore: TokenStoreSchema.optional(),
  }),
});

export type StateStore = {
  isAuthenticated: boolean;
  isClientVerified: boolean;
  tokenStore: TokenStore;
  refreshToken?: string;
  getIsAuthenticated: () => boolean;
  setIsAuthenticated: (next: boolean) => void;
  getTokenStore: () => TokenStore | undefined;
  setTokenStore: (nextStore: TokenStore) => void;
  forceTokenExpiration: (nextStore: TokenStore) => void;
  resetStore: () => void;
  resetTokenStore: () => void;
  setRefreshToken: (refreshToken: string) => void;
  setIsClientVerified: (nextState: boolean) => void;
};
