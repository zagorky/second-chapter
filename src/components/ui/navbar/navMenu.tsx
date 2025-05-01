import type { NavigationMenuProps } from '@radix-ui/react-navigation-menu';

import { Link, useLocation } from 'react-router';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '~/components/ui/navigation-menu/navigationMenu';

export const NavMenu = (props: NavigationMenuProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/" data-active={currentPath === '/'}>
              Main
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/about" data-active={currentPath === '/about'}>
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/catalog" data-active={currentPath === '/catalog'}>
              Catalog
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/cart" data-active={currentPath === '/cart'}>
              Cart
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
