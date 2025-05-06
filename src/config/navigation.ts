export const NAVIGATION_ROUTES = {
  main: '/',
  about: '/about',
  catalog: '/catalog',
  cart: '/cart',
  signin: '/login',
  signup: '/signup',
  error: '/*',
} as const;

export const NAVIGATION_ITEMS = [
  { path: NAVIGATION_ROUTES.main, title: 'Main' },
  { path: NAVIGATION_ROUTES.about, title: 'About' },
  { path: NAVIGATION_ROUTES.catalog, title: 'Catalog' },
  { path: NAVIGATION_ROUTES.cart, title: 'Cart' },
] as const;
