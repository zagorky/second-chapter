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

export const authenticatedUserGuard = () => {
  if (useAppStore.getState().isAuthenticated) {
    return redirect(navigationRoutes.main.path);
  }

  return null;
};

export const verifiedUserGuard = async () => {
  const isClientVerified = useAppStore.getState().isClientVerified;

  if (isClientVerified) {
    return;
  }

  await new Promise<void>((resolve) => {
    const unsubscribe = useAppStore.subscribe(
      (state) => state.isClientVerified,
      (isVerified) => {
        if (isVerified) {
          unsubscribe();
          resolve();
        }
      }
    );
  });
};
