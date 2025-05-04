import { Menu } from 'lucide-react';

import { Button } from '~/components/ui/button/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';

import { Logo } from './logo';
import { NavMenu } from './navMenu';

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Logo />
        <NavMenu orientation="vertical" className="mt-12" />
      </SheetContent>
    </Sheet>
  );
};
