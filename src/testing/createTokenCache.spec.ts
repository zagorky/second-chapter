import type { TokenStore } from '@commercetools/ts-client';

import { useAppStore } from '~stores/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { StateStore } from '~/stores/types/types';

import { createTokenCache } from '~/app/API/utils/createTokenCache';

vi.mock('~stores/store', () => {
  const state: StateStore = {
    isAuthenticated: false,
    store: {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    },
    setIsAuthenticated: (isAuth: boolean) => {
      state.isAuthenticated = isAuth;
    },
    setStore: (nextStore: TokenStore) => {
      state.store = nextStore;
    },
    getIsAuthenticated: () => state.isAuthenticated,
    getStore: () => state.store,
    forceTokenExpiration: () => {
      state.store.expirationTime = 0;
    },
  };

  return {
    useAppStore: {
      getState: () => state,
    },
  };
});

describe('createTokenCache', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const state = useAppStore.getState();

    state.isAuthenticated = false;
    state.store = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };
  });

  it('should get and set store from zustand', () => {
    const tokenCache = createTokenCache();

    const testStore: TokenStore = {
      token: 'foo',
      refreshToken: 'bar',
      expirationTime: 123456,
    };

    tokenCache.set(testStore);
    const result = tokenCache.get();

    expect(result).toEqual(testStore);
  });
});
