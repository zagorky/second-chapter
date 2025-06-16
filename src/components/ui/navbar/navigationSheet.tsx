import { SheetClose } from '~components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '~/components/ui/button/button';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';

import { DialogDescription, DialogTitle } from '../dialog/dialog';
import { NavMenu } from './navMenu';

export const NavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="default" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-4">
        <SheetClose className="ml-auto" asChild>
          <Button variant="neutral" size="icon">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetClose>
        <DialogTitle className={'sr-only'}>Navigation Menu</DialogTitle>
        <DialogDescription className="sr-only">Navigation links and actions</DialogDescription>
        <NavMenu
          orientation="vertical"
          className="max-w-none justify-stretch"
          onItemClick={() => {
            setIsOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
