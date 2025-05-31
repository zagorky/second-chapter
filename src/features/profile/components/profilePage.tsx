import type * as React from 'react';

export function ProfileForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={className} {...props}>
      <h1 className="heading-1">Profile data</h1>
    </div>
  );
}
