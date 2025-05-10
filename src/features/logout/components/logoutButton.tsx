import { Button } from '~components/ui/button/button';
import { useAuth } from '~hooks/useAuth';
import { LogOut } from 'lucide-react';

export const LogoutButton = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <Button variant="outline" className="sm:inline-flex" onClick={handleLogout}>
      <div className="flex items-center gap-2">
        <LogOut className="size-4 sm:hidden sm:size-0" />
        <span className="hidden sm:inline">Logout</span>
      </div>
    </Button>
  );
};
