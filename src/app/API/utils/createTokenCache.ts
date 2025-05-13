import type { TokenCache, TokenStore } from '@commercetools/ts-client';

import { useAppStore } from '~/stores/store';

export const createTokenCache = (): TokenCache => {
  return {
    get: () => useAppStore.getState().store,
    set: (store: TokenStore) => {
      useAppStore.getState().setStore(store);
    },
  };
};
