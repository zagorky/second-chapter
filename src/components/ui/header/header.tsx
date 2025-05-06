import { Button } from '~components/ui/button/button.tsx';
import { ModeToggle } from '~components/ui/modeToggle.tsx';
import { NavigationSheet } from '~components/ui/navbar/navigationSheet.tsx';
import { NavMenu } from '~components/ui/navbar/navMenu.tsx';
import { NAVIGATION_ROUTES } from '~config/navigation.ts';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router';

export const Header = () => {
  return (
    <header className="bg-background mx-auto flex h-16 max-w-screen-xl items-center justify-between border-b px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-8">
        <Link to={NAVIGATION_ROUTES.main}>
          <BookOpen className="size-8" />
        </Link>

        <NavMenu className="hidden md:block" />
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={NAVIGATION_ROUTES.signin}>Sign In</Link>
        </Button>
        <Button>
          <Link to={NAVIGATION_ROUTES.signup}>Sign Up</Link>
        </Button>
        <ModeToggle />

        <div className="md:hidden">
          <NavigationSheet />
        </div>
      </div>
    </header>
  );
};
