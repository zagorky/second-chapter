import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { useAuth } from '~features/sign-in/hooks/useAuth';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router';

export const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button variant="outline" className="sm:inline-flex" onClick={handleLogout}>
      <Link to={navigationRoutes.login.path} className="flex items-center gap-2">
        <LogOut className="size-4 sm:hidden sm:size-0" />
        <span className="hidden sm:inline">Logout</span>
      </Link>
    </Button>
  );
};
