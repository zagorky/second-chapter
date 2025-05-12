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
        tokenStore: result.data.state.tokenStore,
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
};

export const useAppStore = create<StateStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: retrieveStoreFromLS()?.isAuthenticated ?? false,
      tokenStore: retrieveStoreFromLS()?.tokenStore ?? emptyStore,
      getIsAuthenticated: () => get().isAuthenticated,
      setIsAuthenticated: (nextAuthenticatedStatus: boolean) => {
        set({ isAuthenticated: nextAuthenticatedStatus });
      },
      setTokenStore: (nextStore?: TokenStore) => {
        set({ tokenStore: nextStore });
      },
      getTokenStore: () => get().tokenStore,
      forceTokenExpiration: () => {
        const currentStore = get().tokenStore;

        currentStore.expirationTime = 0;
        set({ tokenStore: currentStore });
      },
      setRefreshToken: (refreshToken: string) => {
        set({ refreshToken });
      },
      resetTokenStore: () => {
        set({ tokenStore: emptyStore });
      },
      resetStore: () => {
        set({ isAuthenticated: false });
        set({ tokenStore: emptyStore });
        set({ refreshToken: undefined });
      },
      setStore: (nextState: StateStore) => {
        set(() => nextState);
      },
    }),
    {
      name: API_CONFIG.LS_KEY,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        refreshToken: state.refreshToken,
        tokenStore: state.tokenStore,
      }),
    }
  )
);
