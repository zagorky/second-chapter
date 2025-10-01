import type { TokenCache, TokenStore } from '@commercetools/ts-client';

import { useAppStore } from '~/stores/store';

export const createTokenCache = (): TokenCache => {
  return {
    get: () => useAppStore.getState().tokenStore,
    set: (store: TokenStore) => {
      useAppStore.getState().setTokenStore(store);
    },
  };
};
