import { BookOpen } from 'lucide-react';
import { Outlet, Link } from 'react-router';

import { Button } from '~/components/ui/button/button';

import { ModeToggle } from '../ui/modeToggle';
import { NavigationSheet } from '../ui/navbar/navigationSheet';
import { NavMenu } from '../ui/navbar/navMenu';

export const MainLayout = () => {
  return (
    <div className="bg-muted min-h-screen">
      <header className="bg-background mx-auto flex h-16 max-w-screen-xl items-center justify-between border-b px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/">
            <BookOpen className="size-8" />
          </Link>

          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button>
            <Link to="/signup">Sign Up</Link>
          </Button>
          <ModeToggle />

          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl p-8 text-center">
        <Outlet />
      </main>
    </div>
  );
};
