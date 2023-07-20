import React, { FC } from 'react';
import { ExitButton } from './ExitButton';
import { MenuProps } from './Menu.types';
import { MenuItemComponent } from './MenuItemComponent';
import { DevSettingsButton, Footer } from './Menu.styled';
import { isDevMode } from '01/axios';

export const Menu: FC<MenuProps> = ({ menuItems, openDevSettingsModal }) => {
  return (
    <div>
      <div>
        {menuItems.map((menuItem) => (
          <MenuItemComponent menuItem={menuItem} key={menuItem.path} />
        ))}
      </div>
      <Footer>
        <ExitButton />
        {isDevMode && (
          <DevSettingsButton onClick={openDevSettingsModal}>
            🛠️ dev
          </DevSettingsButton>
        )}
      </Footer>
    </div>
  );
};
