import type { SortOption } from '~features/sort/types/types';

export const SORT_OPTIONS: SortOption[] = [
  {
    shortKey: 'default',
    commercetoolsParameter: '',
    label: 'Sort by default',
    requiresCurrency: false,
  },
  {
    shortKey: 'price-asc',
    commercetoolsParameter: 'price asc',
    label: 'Price (Low to High)',
    requiresCurrency: true,
  },
  {
    shortKey: 'price-desc',
    commercetoolsParameter: 'price desc',
    label: 'Price (High to Low)',
    requiresCurrency: true,
  },
  {
    shortKey: 'name-asc',
    commercetoolsParameter: 'name.en-GB asc',
    label: 'Name (A-Z)',
    requiresCurrency: false,
  },
  {
    shortKey: 'name-desc',
    commercetoolsParameter: 'name.en-GB desc',
    label: 'Name (Z-A)',
    requiresCurrency: false,
  },
] as const;
