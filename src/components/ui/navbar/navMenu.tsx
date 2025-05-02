import type { NavigationMenuProps } from '@radix-ui/react-navigation-menu';

import { NAVIGATION_ITEMS } from '~config/navigation';
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
        {NAVIGATION_ITEMS.map((item) => {
          return (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuLink asChild>
                <Link to={item.path} data-active={currentPath === item.path}>
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
