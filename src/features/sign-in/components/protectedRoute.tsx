import type { ReactNode } from 'react';

import { navigationRoutes } from '~config/navigation';
import { useAppStore } from '~stores/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      void navigate(navigationRoutes.main.path, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? null : children;
};
