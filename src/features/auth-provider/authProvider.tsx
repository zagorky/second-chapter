import type { ReactNode } from 'react';

import { Spinner } from '~components/ui/spinner/spinner';
import { useAuth } from '~features/sign-in/hooks/useAuth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isClientVerified } = useAuth();

  if (!isClientVerified) {
    return <Spinner />;
  }

  return children;
};
