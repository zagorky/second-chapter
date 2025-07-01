import { MainPageSkeleton } from '~components/ui/page-skeleton/mainPageSkeleton';
import { navigationRoutes } from '~config/navigation';
import { useTimeout } from '~hooks/useTimeout';
import { useState } from 'react';
import { useMatches } from 'react-router';

const VISIBILITY_DELAY = 1000;

export const PageSkeleton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const matches = useMatches();

  useTimeout(() => {
    setIsVisible(true);
  }, VISIBILITY_DELAY);

  return isVisible && matchPath(matches[1].pathname);
};

function matchPath(pathname: string) {
  switch (pathname) {
    case navigationRoutes.about.path: {
      return <></>;
    }

    case navigationRoutes.catalog.path: {
      return <></>;
    }

    case navigationRoutes.cart.path: {
      return <></>;
    }

    case navigationRoutes.login.path: {
      return <></>;
    }

    case navigationRoutes.signup.path: {
      return <></>;
    }

    case navigationRoutes.profile.path: {
      return <></>;
    }

    case navigationRoutes.product.path: {
      return <></>;
    }

    default: {
      return <MainPageSkeleton />;
    }
  }
}
