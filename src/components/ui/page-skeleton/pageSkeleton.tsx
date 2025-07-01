import { useTimeout } from '~hooks/useTimeout';
import { useState } from 'react';

const VISIBILITY_DELAY = 1000;

export const PageSkeleton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useTimeout(() => {
    setIsVisible(true);
  }, VISIBILITY_DELAY);

  return isVisible;
};
