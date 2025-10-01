import type { ComponentPropsWithRef } from 'react';

import { Button } from '~components/ui/button/button';

type PropertyType = ComponentPropsWithRef<'button'>;

export const DotButton: React.FC<PropertyType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <Button variant="noShadow" size="dot" {...restProps}>
      {children}
    </Button>
  );
};
