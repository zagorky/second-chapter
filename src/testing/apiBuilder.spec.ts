import type { TokenStore } from '@commercetools/ts-client';

import { useAppStore } from '~stores/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { StateStore } from '~/stores/types/types';

import { ApiBuilder } from '~/app/API/apiBuilder';

const INVALID_CREDENTIALS_CODE = 'invalid_customer_account_credentials';

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

const executeMock = vi.fn();

const chainApiMock = () => ({
  me: () => ({
    get: () => ({ execute: executeMock }),
  }),
});

vi.mock('@commercetools/platform-sdk', () => ({
  createApiBuilderFromCtpClient: () => ({
    withProjectKey: chainApiMock,
  }),
}));

describe('ApiBuilder', () => {
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
  it('should return success payload and sets isAuthenticated on successful login', async () => {
    const fakeCustomer = {
      id: '1',
    };

    executeMock.mockResolvedValueOnce({ body: fakeCustomer });

    const api = new ApiBuilder();
    const result = await api.login({ username: 'user', password: 'password' });

    expect(result).toEqual({ success: true, payload: fakeCustomer });
    expect(useAppStore.getState().isAuthenticated).toBe(true);
  });

  it('should return failure result and keep user logged out on failed relogin', async () => {
    const fakeCustomer = '';

    executeMock.mockResolvedValueOnce({ body: fakeCustomer });

    const api = new ApiBuilder();

    await api.login({ username: 'user', password: 'password' });
    expect(useAppStore.getState().isAuthenticated).toBe(true);

    api.logout();

    const invalidError = { code: INVALID_CREDENTIALS_CODE };

    executeMock.mockRejectedValueOnce(invalidError);

    const relogin = await api.login({ username: 'user', password: 'wrong' });

    expect(relogin).toEqual({ success: false, error: invalidError });
    expect(useAppStore.getState().isAuthenticated).toBe(false);
  });

  it('should be unauthenticated if initialized with no token in store', () => {
    new ApiBuilder();

    const state = useAppStore.getState();

    expect(state.isAuthenticated).toBe(false);
  });

  it('should not clear store and remain unauthenticated if refresh token is present', () => {
    const tokenStore: TokenStore = {
      token: 'access',
      refreshToken: 'refresh',
      expirationTime: 0,
    };

    const state = useAppStore.getState();

    state.store = tokenStore;

    new ApiBuilder();

    expect(state.store).toEqual(tokenStore);
    expect(state.isAuthenticated).toBe(false);
  });

  it('should unauthenticate user when logout is called', () => {
    const state = useAppStore.getState();

    const api = new ApiBuilder();

    state.isAuthenticated = true;

    api.logout();

    expect(state.isAuthenticated).toBe(false);
  });
});
