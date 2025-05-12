import { Button } from '~components/ui/button/button';
import { ModeToggle } from '~components/ui/modeToggle';
import { NavigationSheet } from '~components/ui/navbar/navigationSheet';
import { NavMenu } from '~components/ui/navbar/navMenu';
import { navigationRoutes } from '~config/navigation';
import { LogoutButton } from '~features/logout/components/logoutButton';
import { useAuth } from '~features/sign-in/hooks/useAuth';
import { BookOpen, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router';

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-background mx-auto flex h-16 max-w-screen-xl items-center justify-between border-b px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-8">
        <Link to={navigationRoutes.main.path}>
          <BookOpen className="size-8" />
        </Link>

        <NavMenu className="hidden md:block" />
      </div>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <LogoutButton />
        ) : (
          <>
            <Button variant="outline" className="sm:inline-flex" asChild>
              <Link to={navigationRoutes.signup.path} className="flex items-center gap-2">
                <UserPlus className="size-4 sm:hidden sm:size-0" />
                <span className="hidden sm:inline">{navigationRoutes.signup.title}</span>
              </Link>
            </Button>
            <Button variant="outline" className="sm:inline-flex" asChild>
              <Link to={navigationRoutes.login.path}>
                <LogIn className="size-4 sm:hidden sm:size-0" />
                <span className="hidden sm:inline">{navigationRoutes.login.title}</span>
              </Link>
            </Button>
          </>
        )}
        <ModeToggle />
        <div className="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </header>
  );
};
