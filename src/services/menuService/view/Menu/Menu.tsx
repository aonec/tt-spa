import React, { FC } from 'react';
import { ExitButton } from './ExitButton';
import { MenuProps } from './Menu.types';
import { MenuItemComponent } from './MenuItemComponent';
import { DevSettingsButton, Footer, MenuItemWrapper } from './Menu.styled';
import { isDevMode } from 'api/axios';

export const Menu: FC<MenuProps> = ({ menuItems, openDevSettingsModal }) => {
  return (
    <div>
      <MenuItemWrapper>
        {menuItems.map((menuItem) => (
          <MenuItemComponent menuItem={menuItem} key={menuItem.path} />
        ))}
      </MenuItemWrapper>
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
