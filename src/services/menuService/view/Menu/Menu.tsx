import React, { FC } from 'react';
import { ExitButton } from './ExitButton';
import { MenuProps } from './Menu.types';
import { MenuItemComponent } from './MenuItemComponent';

export const Menu: FC<MenuProps> = ({ menuItems }) => {
  return (
    <div>
      <div>
        {menuItems.map((menuItem) => (
          <MenuItemComponent menuItem={menuItem} key={menuItem.path} />
        ))}
      </div>
      <ExitButton />
    </div>
  );
};
