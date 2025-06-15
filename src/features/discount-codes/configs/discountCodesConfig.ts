import type { DiscountCodeConfig } from '~features/discount-codes/types/DiscountCodeConfig';

export const DISCOUNT_CODES: DiscountCodeConfig[] = [
  {
    id: '52d5288e-a07e-4ec9-a567-2095163f8a7e',
    code: 'HELP',
    title: 'Help',
    description: 'Feeling lost? Shout ‘HELP’ — spend £10 and get a free ChatGPT book',
    conditions: 'Add products for at least £10',
  },
  {
    id: '95b19d4a-7129-4ee9-a564-c4d713f569d8',
    code: 'COMMIT-CRIME',
    title: 'Commit Crime',
    description: 'Ready to COMMIT-CRIME? Get discounts on true crime and programming books. No alibi needed!',
    conditions: 'Add books from the true crime or programming categories',
  },
  {
    id: '2aaf64ac-66cf-476c-a3e7-168a75292b1a',
    code: 'DASHA',
    title: 'Dasha',
    description:
      'Are you a Dasha? Good news: you’re awesome. Even better news: books just got cheaper for you! Happy birthday to our Dasha!',
    conditions: 'Your name should be Dasha',
  },
];
