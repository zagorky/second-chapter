import { navigationRoutes } from '~config/navigation';

export const FOOTER_NAVIGATION_ITEMS = [
  navigationRoutes.main,
  navigationRoutes.about,
  navigationRoutes.catalog,
  navigationRoutes.profile,
] as const;

export const FOOTER_HELP_ITEMS = [
  { title: 'Customer Service' },
  { title: 'Shipping & Delivery' },
  { title: 'Returns & Refunds' },
  { title: 'Track Order' },
] as const;
