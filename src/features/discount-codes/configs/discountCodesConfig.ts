import type { DiscountCodeConfig } from '~features/discount-codes/types/DiscountCodeConfig';

export const DISCOUNT_CODES: DiscountCodeConfig[] = [
  {
    id: '52d5288e-a07e-4ec9-a567-2095163f8a7e',
    code: 'HELP',
    title: 'Help',
    description: 'Feeling lost? Shout ‘HELP’ — spend £10 and get a free ChatGPT book',
    conditions: 'Add products for at least £10',
    color: {
      background: '--color-chart-1',
      foreground: '--color-chart-2',
    },
    image: {
      src: '/discount-banners/hand.png',
      width: 262,
      height: 219,
    },
    discount: {
      type: 'gift-line-item',
    },
  },
  {
    id: '95b19d4a-7129-4ee9-a564-c4d713f569d8',
    code: 'COMMIT-CRIME',
    title: 'Commit Crime',
    description: 'Ready to COMMIT-CRIME? Get 30% discount on true crime and programming books. No alibi needed!',
    conditions: 'Add books from the true crime or programming categories',
    color: {
      background: '--color-chart-2',
      foreground: '--color-chart-1',
    },
    image: {
      src: '/discount-banners/hand.png',
      width: 262,
      height: 219,
    },
    discount: {
      type: 'relative',
      items: 'all',
      percentage: 30,
    },
  },
  {
    id: '2aaf64ac-66cf-476c-a3e7-168a75292b1a',
    code: 'DASHA',
    title: 'Dasha',
    image: {
      src: '/discount-banners/hand.png',
      width: 262,
      height: 219,
    },
    description:
      'Are you a Dasha? Good news: you’re awesome. Even better news: books just got 20% cheaper for you! Happy birthday to our Dasha!',
    conditions: ' Only for users named Dasha, Daria or Darya',
    color: {
      background: '--color-chart-3',
      foreground: '--color-chart-4',
    },
    discount: {
      type: 'relative',
      items: 'some',
      percentage: 20,
    },
  },
];
