import type { ReactNode } from 'react';

import { navigationRoutes } from '~config/navigation';
import { useAppStore } from '~stores/store';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const PathGuard = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (isAuthenticated && location.pathname === navigationRoutes.login.path) {
      void navigate(navigationRoutes.main.path, { replace: true });
    } else {
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (isCheckingAuth) {
    return null;
  }

  return <>{children}</>;
};
