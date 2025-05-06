import type { TokenCache, TokenStore } from '@commercetools/ts-client';

import { AppStore } from './store';

const emptyStore = {
  token: '',
  expirationTime: 0,
  refreshToken: '',
};

export const createTokenCache = (): TokenCache => {
  AppStore.tokenStore = undefined;

  return {
    get: () => AppStore.tokenStore ?? emptyStore,
    set: (store: TokenStore) => {
      AppStore.tokenStore = store;
    },
  };
};
