import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { useAuth } from '~features/sign-in/hooks/useAuth';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button variant="neutral" className="sm:inline-flex" onClick={logout}>
      <Link to={navigationRoutes.login.path} className="flex items-center gap-2">
        <LogOut className="size-4 sm:hidden sm:size-0" />
        <span className="hidden sm:inline">Logout</span>
      </Link>
    </Button>
  );
};
