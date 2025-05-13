import type { TokenStore } from '@commercetools/ts-client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { API_CONFIG } from '~/app/API/config/apiConfig';

import type { StateStore } from './types/types';

import { ZustandStoreSchema } from './types/types';

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

const emptyStore = {
  token: '',
  expirationTime: 0,
  refreshToken: '',
};

export const useAppStore = create<StateStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: retrieveStoreFromLS()?.isAuthenticated ?? false,
      getIsAuthenticated: () => get().isAuthenticated,
      setIsAuthenticated: (nextAuthenticatedStatus: boolean) => {
        set({ isAuthenticated: nextAuthenticatedStatus });
      },
      store: retrieveStoreFromLS()?.tokenStore ?? emptyStore,
      setStore: (nextStore?: TokenStore) => {
        set({ store: nextStore });
      },
      getStore: () => get().store,
      forceTokenExpiration: () => {
        const currentStore = get().store;

        currentStore.expirationTime = 0;
        set({ store: currentStore });
      },
    }),
    {
      name: API_CONFIG.LS_KEY,
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, store: state.store }),
    }
  )
);
