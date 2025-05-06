import type { TokenCacheOptions } from '@commercetools/ts-client';

import { API_CONFIG } from '~config/apiConfig';
import { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const TokenStoreSchema = z.object({
  token: z.string(),
  expirationTime: z.number(),
  refreshToken: z.string().optional(),

  tokenCacheKey: z.custom<TokenCacheOptions>().optional(),
});

const ZustandStoreSchema = z.object({
  state: z.object({
    isAuthenticated: z.boolean(),
    store: TokenStoreSchema.optional(),
  }),
});

type TokenStore = z.infer<typeof TokenStoreSchema>;

type StateStore = {
  isAuthenticated: boolean;
  store?: TokenStore;
  getIsAuthenticated: () => boolean;
  setIsAuthenticated: (next: boolean) => void;
  getStore: () => TokenStore | undefined;
  setStore: (nextStore?: TokenStore) => void;
};

const retrieveStoreFromLS = () => {
  const raw = localStorage.getItem(API_CONFIG.LS_KEY);

  if (!raw) return;

  try {
    const parsed: unknown = JSON.parse(raw);
    const result = ZustandStoreSchema.safeParse(parsed);

    if (result.success) {
      return {
        isAuthenticated: result.data.state.isAuthenticated,
        tokenStore: result.data.state.store,
      };
    } else {
      console.error(result.error.format());
    }
  } catch (error) {
    console.error(error);
  }
};

export const useAppStore = create<StateStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: retrieveStoreFromLS()?.isAuthenticated ?? false,
      getIsAuthenticated: () => get().isAuthenticated,
      setIsAuthenticated: (nextAuthenticatedStatus: boolean) => {
        set({ isAuthenticated: nextAuthenticatedStatus });
      },
      store: retrieveStoreFromLS()?.tokenStore,
      setStore: (nextStore?: TokenStore) => {
        set({ store: nextStore });
      },
      getStore: () => get().store,
    }),
    {
      name: API_CONFIG.LS_KEY,
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, store: state.store }),
    }
  )
);
