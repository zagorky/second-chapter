import type { TokenStore } from '@commercetools/ts-client';

import { useAppStore } from '~stores/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { StateStore } from '~/stores/types/types';

import { ApiBuilder } from '~/app/API/apiBuilder';

const INVALID_CREDENTIALS_CODE = 'invalid_customer_account_credentials';

vi.mock('~stores/store', () => {
  const state: StateStore = {
    isAuthenticated: false,
    tokenStore: {
      token: '',
      expirationTime: 0,
    },
    refreshToken: undefined,
    setIsAuthenticated: (isAuth: boolean) => {
      state.isAuthenticated = isAuth;
    },
    setTokenStore: (nextStore: TokenStore) => {
      state.tokenStore = nextStore;
    },
    getIsAuthenticated: () => state.isAuthenticated,
    getTokenStore: () => state.tokenStore,
    forceTokenExpiration: () => {
      state.tokenStore.expirationTime = 0;
    },
    resetStore: () => {
      state.isAuthenticated = false;
      state.tokenStore = { token: '', expirationTime: 0 };
      state.refreshToken = undefined;
    },
    setRefreshToken: (refreshToken: string) => {
      state.refreshToken = refreshToken;
    },
    resetTokenStore: () => {
      state.tokenStore = { token: '', expirationTime: 0 };
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
  productProjections: () => ({
    get: () => ({ execute: executeMock }),
  }),
});

vi.mock('@commercetools/platform-sdk', () => ({
  createApiBuilderFromCtpClient: () => ({
    withProjectKey: () => chainApiMock(),
  }),
}));

describe('ApiBuilder', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    executeMock.mockReset();
    const state = useAppStore.getState();

    state.isAuthenticated = false;
    state.tokenStore = {
      token: '',
      expirationTime: 0,
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

  it('should not clear store and preserve authentication state if refresh token is present', () => {
    const tokenStore: TokenStore = {
      token: 'access',
      refreshToken: 'refresh',
      expirationTime: 0,
    };

    const state = useAppStore.getState();

    state.tokenStore = tokenStore;

    new ApiBuilder();

    expect(state.tokenStore).toEqual(tokenStore);
    expect(state.isAuthenticated).toBe(false);
  });

  it('should unauthenticate user when logout is called', () => {
    const state = useAppStore.getState();

    const api = new ApiBuilder();

    state.isAuthenticated = true;

    api.logout();

    expect(state.isAuthenticated).toBe(false);
  });

  it('should save refreshToken separately and preserve authentication state when access token is expired', async () => {
    const state = useAppStore.getState();
    const refreshToken = 'refresh';

    state.isAuthenticated = true;
    state.tokenStore = {
      token: 'token',
      refreshToken,
      expirationTime: 0,
    };
    state.refreshToken = undefined;

    executeMock.mockResolvedValueOnce({ body: {} });

    const api = new ApiBuilder();

    await api.init();

    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(state.refreshToken).toBe(refreshToken);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should make a call to API and reset store when there is invalid refresh token', async () => {
    const state = useAppStore.getState();

    state.tokenStore.refreshToken = 'invalid refresh token';

    executeMock.mockRejectedValueOnce(new Error('error'));

    const api = new ApiBuilder();

    await api.init();

    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(state.refreshToken).toBeUndefined();
    expect(state.isAuthenticated).toBe(false);
  });
  it('should not mutate store when token is valid and state is unauthenticated', async () => {
    const state = useAppStore.getState();

    const tokenStore = {
      token: 'token',
      expirationTime: Date.now() + 100000,
    };

    state.tokenStore = { ...tokenStore };

    executeMock.mockResolvedValueOnce({ body: {} });

    const api = new ApiBuilder();

    await api.init();

    expect(state.tokenStore).toEqual(tokenStore);
    expect(state.isAuthenticated).toBe(false);
  });
});
