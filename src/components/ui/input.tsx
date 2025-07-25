import * as React from 'react';

import { cn } from '~/lib/utilities';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'rounded-base border-border bg-secondary-background selection:bg-main selection:text-main-foreground font-base text-foreground file:font-heading placeholder:text-foreground/50 flex h-10 w-full border-2 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-default disabled:opacity-50',
        'read-only:text-md read-only:cursor-text read-only:border-2 read-only:bg-transparent read-only:shadow-none read-only:focus:ring-0 read-only:focus:outline-none read-only:focus-visible:ring-offset-0',
        className
      )}
      {...props}
    />
  );
}

export { Input };
