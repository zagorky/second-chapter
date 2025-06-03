import { cva, type VariantProps } from 'class-variance-authority';

export const spinnerVariants = cva(
  'border-main-foreground animate-spin rounded-full border-2 border-dashed transition-opacity duration-300',
  {
    variants: {
      size: {
        md: 'w-5 h-5',
        xl: 'w-10 h-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
export type SpinnerSize = VariantProps<typeof spinnerVariants>['size'];
