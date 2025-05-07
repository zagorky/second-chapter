import { Button } from '~components/ui/button/button.tsx';
import { ModeToggle } from '~components/ui/modeToggle.tsx';
import { NavigationSheet } from '~components/ui/navbar/navigationSheet.tsx';
import { NavMenu } from '~components/ui/navbar/navMenu.tsx';
import { navigationRoutes } from '~config/navigation.ts';
import { BookOpen, LogIn, LogOut, UserPlus } from 'lucide-react';
import { Link } from 'react-router';

export const Header = () => {
  return (
    <header className="bg-background mx-auto flex h-16 max-w-screen-xl items-center justify-between border-b px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-8">
        <Link to={navigationRoutes.main.path}>
          <BookOpen className="size-8" />
        </Link>

        <NavMenu className="hidden md:block" />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="sm:inline-flex" asChild>
          <Link to={navigationRoutes.login.path}>
            <LogIn className="size-4 sm:hidden sm:size-0" />
            <span className="hidden sm:inline">{navigationRoutes.login.title}</span>
          </Link>
        </Button>
        <Button variant="outline" className="sm:inline-flex" asChild>
          <Link to={navigationRoutes.signup.path} className="flex items-center gap-2">
            <UserPlus className="size-4 sm:hidden sm:size-0" />
            <span className="hidden sm:inline">{navigationRoutes.signup.title}</span>
          </Link>
        </Button>
        <Button variant="outline" className="sm:inline-flex">
          <div className="flex items-center gap-2">
            <LogOut className="size-4 sm:hidden sm:size-0" />
            <span className="hidden sm:inline">Logout</span>
          </div>
        </Button>
        <ModeToggle />
        <div className="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </header>
  );
};
