import type { TokenStore } from '@commercetools/ts-client';

import { useAppStore } from '~stores/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { StateStore } from '~/stores/types/types';

import { ApiBuilder } from '~/app/API/apiBuilder';
import { API_ERRORS } from '~/app/API/config/apiErrors';

vi.mock('~stores/store', () => {
  const state: StateStore = {
    isAuthenticated: false,
    store: undefined,
    setIsAuthenticated: (isAuth: boolean) => {
      state.isAuthenticated = isAuth;
    },
    setStore: (nextStore: TokenStore | undefined) => {
      state.store = nextStore;
    },
    getIsAuthenticated: () => state.isAuthenticated,
    getStore: () => state.store,
  };

  return {
    useAppStore: {
      getState: () => state,
    },
  };
});

const executeMock = vi.fn();

const INVALID_CREDENTIALS_CODE = 'invalid_customer_account_credentials';

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
globalThis.fetch = vi.fn();

describe('ApiBuilder', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const state = useAppStore.getState();

    state.isAuthenticated = false;
    state.store = undefined;
  });

  it('should reset authentication state on logout and return error on failed relogin', async () => {
    const state = useAppStore.getState();

    executeMock.mockResolvedValueOnce({ body: {} });

    const api = new ApiBuilder();

    await api.login({ username: '', password: '' });

    expect(state.isAuthenticated).toBe(true);

    api.logout();
    expect(state.isAuthenticated).toBe(false);

    state.store = undefined;

    const invalidError = {
      code: INVALID_CREDENTIALS_CODE,
      message: '',
    };

    executeMock.mockRejectedValueOnce(invalidError);

    const result = await api.login({ username: '', password: '' });

    expect(result.success).toBe(false);
    expect(result.errorMessage).toBe(API_ERRORS.invalid_customer_account_credentials);
  });

  it('should have anonymous state if initialized with no token in store', () => {
    new ApiBuilder();

    const state = useAppStore.getState();

    expect(state.isAuthenticated).toBe(false);
    expect(state.store).toBeUndefined();
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

  it('should return correct error message when login fails with invalid credentials', async () => {
    const error = {
      code: INVALID_CREDENTIALS_CODE,
      message: '',
    };

    executeMock.mockRejectedValueOnce(error);

    const api = new ApiBuilder();
    const { success, errorMessage } = await api.login({ username: 'wrong', password: 'wrong' });

    expect(success).toBe(false);
    expect(errorMessage).toBe(API_ERRORS.invalid_customer_account_credentials);
  });

  it('should return fallback error message when login fails with unknown error code', async () => {
    const error = { code: '' };

    executeMock.mockRejectedValueOnce(error);

    const api = new ApiBuilder();
    const result = await api.login({ username: '', password: '' });

    expect(result.success).toBe(false);

    expect(result.errorMessage).toBe(API_ERRORS.LOGIN_UNKNOWN);
  });

  it('should unauthenticate user when logout is called', () => {
    const state = useAppStore.getState();

    state.isAuthenticated = true;

    const api = new ApiBuilder();

    api.logout();

    expect(state.isAuthenticated).toBe(false);
  });
});
