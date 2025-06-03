import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-base hover:cursor-pointer ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-hidden  active:opacity-60 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'text-main-foreground bg-main border-2 border-border shadow-shadow  hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none',
        noShadow:
          'text-main-foreground bg-main border-2 border-border hover:bg-background hover:outline-main hover:outline-2',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        neutral:
          'bg-secondary-background text-foreground border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none',
        reverse:
          'text-main-foreground bg-main border-2 border-border hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-shadow',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        dot: 'h-5 w-5',
        icon: 'size-10',
        iconLg: 'size-12 [&_svg]:size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
