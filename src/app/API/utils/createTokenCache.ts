import type { TokenCache, TokenStore } from '@commercetools/ts-client';

import { useAppStore } from '~/stores/store';

const emptyStore = {
  token: '',
  expirationTime: 0,
  refreshToken: '',
};

export const createTokenCache = (): TokenCache => {
  return {
    get: () => useAppStore.getState().store ?? emptyStore,
    set: (store: TokenStore) => {
      useAppStore.getState().setStore(store);
    },
  };
};
