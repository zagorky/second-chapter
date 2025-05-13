import { Menu } from 'lucide-react';
import { useState } from 'react';

import { Button } from '~/components/ui/button/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';

import { DialogTitle, DialogDescription } from '../dialog';
import { NavMenu } from './navMenu';

export const NavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="default" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent aria-describedby={'Second Chapter Logo'}>
        <DialogTitle className={'sr-only'}>Navigation Menu</DialogTitle>
        <DialogDescription className="sr-only">Navigation links and actions</DialogDescription>
        <NavMenu
          orientation="vertical"
          className="mt-12"
          onItemClick={() => {
            setIsOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
