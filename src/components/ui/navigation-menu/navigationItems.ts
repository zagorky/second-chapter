import { navigationRoutes } from '~config/navigation.ts';

export const NAVIGATION_ITEMS = [
  navigationRoutes.main,
  navigationRoutes.about,
  navigationRoutes.catalog,
  navigationRoutes.cart,
] as const;
