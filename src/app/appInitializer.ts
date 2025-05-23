import { apiInstance } from '~app/API/apiBuilder';
import { useAppStore } from '~stores/store';

const initApp = () =>
  Promise.resolve()
    .then(() => useAppStore.persist.rehydrate())
    .then(() => apiInstance.init());

class AppInitializer {
  private apiInstanceInit?: Promise<void>;
  public initialize = async () => {
    if (this.apiInstanceInit) {
      await (this.apiInstanceInit ??= initApp());
    }
    await this.apiInstanceInit;

    return {
      isAuthenticated: useAppStore.getState().isAuthenticated,
    };
  };
}

export const appInitializer = new AppInitializer();
