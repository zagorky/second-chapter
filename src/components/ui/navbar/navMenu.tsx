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
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  isActive ? 'nav-item-active block px-4 py-2 text-sm' : 'block px-4 py-2 text-sm font-medium'
                }
              >
                {item.title}
              </NavLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
