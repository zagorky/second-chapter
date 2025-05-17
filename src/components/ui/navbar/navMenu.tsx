import type { NavigationMenuProps } from '@radix-ui/react-navigation-menu';

import { NAVIGATION_ITEMS } from '~components/ui/navigation-menu/navigationItems';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '~components/ui/navigation-menu/navigationMenu';
import { Link, useLocation } from 'react-router';

type NavMenuProps = NavigationMenuProps & {
  onItemClick?: () => void;
};

export const NavMenu = ({ onItemClick, ...props }: NavMenuProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {NAVIGATION_ITEMS.map((item) => {
          return (
            <NavigationMenuItem key={item.path} onClick={onItemClick}>
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
