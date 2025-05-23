import { apiInstance } from '~app/API/apiBuilder';
import { useAppStore } from '~stores/store';
import { redirect } from 'react-router';

export const navigationRoutes = {
  main: { path: '/', title: 'Main' },
  about: { path: '/about', title: 'About Us' },
  catalog: { path: '/catalog', title: 'Catalog' },
  cart: { path: '/cart', title: 'Cart' },
  login: { path: '/login', title: 'Sign In' },
  signup: { path: '/signup', title: 'Sign Up' },
  error: { path: '/*', title: 'Page not Found' },
} as const;

export const initialize = async () => {
  if (!useAppStore.getState().isClientVerified) {
    await useAppStore.persist.rehydrate();
    await apiInstance.init();
  }

  return {
    isClientVerified: useAppStore.getState().isClientVerified,
    isAuthenticated: useAppStore.getState().isAuthenticated,
  };
};

export const authenticatedUserGuard = async () => {
  const { isAuthenticated } = await initialize();

  if (isAuthenticated) {
    return redirect(navigationRoutes.main.path);
  }

  return null;
};
