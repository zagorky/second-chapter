import { cva } from 'class-variance-authority';

export const priceElementVariants = cva('text-2xl text-background border-border border-2 font-bold', {
  variants: {
    type: {
      card: ' rounded-r-base border-l-0',
      standalone: 'rounded-base bg-main',
    },
    price: {
      full: 'bg-main',
      discounted: 'bg-main',
    },
  },
  defaultVariants: {
    type: 'card',
    price: 'full',
  },
});
