import { Button } from '~components/ui/button/button';
import { ModeToggle } from '~components/ui/modeToggle';
import { NavigationSheet } from '~components/ui/navbar/navigationSheet';
import { NavMenu } from '~components/ui/navbar/navMenu';
import { navigationRoutes } from '~config/navigation';
import { CartCounter } from '~features/cart/components/CartCounter';
import { LogoutButton } from '~features/logout/components/logoutButton';
import { useAuth } from '~features/sign-in/hooks/useAuth';
import { LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router';

import { ProfileButton } from '~/components/ui/profile-button/profileButton';

import { Logo } from '../navbar/logo';

export const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-background max-w-screen-3xl h-16 border-b px-4 sm:px-6 lg:px-8">
      <div className="wrapper flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to={navigationRoutes.main.path}>
            <Button variant="ghost" size="iconLg">
              <Logo />
            </Button>
          </Link>
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          <CartCounter />
          {isAuthenticated ? (
            <>
              <LogoutButton />
              <ProfileButton />
            </>
          ) : (
            <>
              <Button variant="default" className="sm:inline-flex" asChild>
                <Link to={navigationRoutes.login.path}>
                  <LogIn className="size-4 sm:hidden sm:size-0" />
                  <span className="hidden sm:inline">{navigationRoutes.login.title}</span>
                </Link>
              </Button>
              <Button variant="neutral" className="sm:inline-flex" asChild>
                <Link to={navigationRoutes.signup.path} className="flex items-center gap-2">
                  <UserPlus className="size-4 sm:hidden sm:size-0" />
                  <span className="hidden sm:inline">{navigationRoutes.signup.title}</span>
                </Link>
              </Button>
            </>
          )}
          <div className="hidden md:flex">
            <ModeToggle />
          </div>
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </header>
  );
};
