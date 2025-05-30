import { appInitializer } from '~app/appInitializer';
import { redirect } from 'react-router';

export const navigationRoutes = {
  main: { path: '/', title: 'Main' },
  about: { path: '/about', title: 'About Us' },
  catalog: { path: '/catalog', title: 'Catalog' },
  cart: { path: '/cart', title: 'Cart' },
  login: { path: '/login', title: 'Sign In' },
  signup: { path: '/signup', title: 'Sign Up' },
  error: { path: '/*', title: 'Page not Found' },
  product: { path: '/product', title: 'Product Page' },
} as const;

export const authenticatedUserGuard = async () => {
  const { isAuthenticated } = await appInitializer.initialize();

  if (isAuthenticated) {
    return redirect(navigationRoutes.main.path);
  }

  return null;
};
