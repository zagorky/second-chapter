import { navigationRoutes } from '~config/navigation';

export const NAVIGATION_ITEMS = [
  navigationRoutes.main,
  navigationRoutes.about,
  navigationRoutes.catalog,
  navigationRoutes.cart,
] as const;
