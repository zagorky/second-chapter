import { cva } from 'class-variance-authority';

export const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center text-main-foreground rounded-base bg-main px-4 py-2 text-sm font-heading transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50'
);
