import type { DiscountCodeConfig } from '~features/discount-codes/types/DiscountCodeConfig';

export const DISCOUNT_CODES: DiscountCodeConfig[] = [
  {
    id: '52d5288e-a07e-4ec9-a567-2095163f8a7e',
    code: 'HELP',
    title: 'Help',
    description: 'Shout "help" to get Chat gpt for dummies for free!',
    conditions: 'Add products for at least £10',
  },
];
