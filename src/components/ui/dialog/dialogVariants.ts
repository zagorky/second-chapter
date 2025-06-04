import { cva } from 'class-variance-authority';

export const dialogContentVariants = cva(
  'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-base border-border shadow-shadow fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border-2 p-6 duration-200',
  {
    variants: {
      size: {
        default: 'max-w-[calc(100%-2rem)] sm:max-w-lg',
        fullscreen: 'w-screen h-screen top-0 left-0 translate-x-0 translate-y-0 rounded-none p-0 overflow-y-scroll ',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);
