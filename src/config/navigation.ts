export const navigationRoutes = {
  main: { path: '/', title: 'Main' },
  about: { path: '/about', title: 'About Us' },
  catalog: { path: '/catalog', title: 'Catalog' },
  cart: { path: '/cart', title: 'Cart' },
  login: { path: '/login', title: 'Sign In' },
  signup: { path: '/signup', title: 'Sign Up' },
  error: { path: '/*', title: 'Page not Found' },
} as const;
