import type { DiscountCodeConfigType } from '~features/discount-codes/types/DiscountCodeConfigType';

export const DISCOUNT_CODE_CONFIG: DiscountCodeConfigType[] = [
  {
    code: 'HELP',
    conditions: 'Add products for at least £10',
    image: {
      src: '/discount-banners/sad.png',
      width: 694,
      height: 694,
    },
    color: {
      background: '--color-chart-4',
      foreground: '--color-chart-1',
    },
    discount: {
      type: 'gift-line-item',
    },
  },
  {
    code: 'COMMIT-CRIME',
    conditions: 'Add books from the true crime or programming categories',
    color: {
      background: '--color-chart-1',
      foreground: '--color-chart-2',
    },
    image: {
      src: '/discount-banners/pets-magnifying-glass.png',
      width: 421,
      height: 236,
    },
    discount: {
      type: 'relative',
      items: 'all',
      percentage: 30,
    },
  },
  {
    code: 'DASHA',
    image: {
      src: '/discount-banners/dasha-and-gift.png',
      width: 487,
      height: 440,
    },
    conditions: 'Only for users named Dasha, Daria or Darya',
    color: {
      background: '--color-chart-5',
      foreground: '--color-chart-1',
    },
    discount: {
      type: 'relative',
      items: 'some',
      percentage: 20,
    },
  },
];
