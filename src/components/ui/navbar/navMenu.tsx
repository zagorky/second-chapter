import type { NavigationMenuProps } from '@radix-ui/react-navigation-menu';

import { NAVIGATION_ITEMS } from '~components/ui/navigation-menu/navigationItems';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '~components/ui/navigation-menu/navigationMenu';
import { NavLink } from 'react-router';

type NavMenuProps = NavigationMenuProps & {
  onItemClick?: () => void;
};

export const NavMenu = ({ onItemClick, ...props }: NavMenuProps) => {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {NAVIGATION_ITEMS.map((item) => {
          return (
            <NavigationMenuItem key={item.path} onClick={onItemClick}>
              <NavLink to={item.path} end className={({ isActive }) => (isActive ? 'border-border border-b-2' : '')}>
                {item.title}
              </NavLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
