import { ExitButton } from '01/components/Menu/Menu';
import React, { FC } from 'react';
import { Wrapper } from './Menu.styled';
import { MenuProps } from './Menu.types';
import { MenuItemComponent } from './MenuItemComponent';

export const Menu: FC<MenuProps> = ({ menuItems }) => {
  return (
    <Wrapper>
      <div>
        {menuItems.map((menuItem) => (
          <MenuItemComponent menuItem={menuItem} />
        ))}
      </div>

      <ExitButton />
    </Wrapper>
  );
};
