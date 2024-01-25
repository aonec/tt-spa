import React, { FC } from 'react';
import { ExitButton } from './ExitButton';
import { MenuProps } from './Menu.types';
import { MenuItemComponent } from './MenuItemComponent';
import {
  DevSettingsButton,
  ExitButtonWrapper,
  Footer,
  MenuItemWrapper,
  UserGuideLink,
} from './Menu.styled';
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
        <ExitButtonWrapper>
          <ExitButton />
          {isDevMode && (
            <DevSettingsButton onClick={openDevSettingsModal}>
              🛠️ dev
            </DevSettingsButton>
          )}
        </ExitButtonWrapper>
        <UserGuideLink target="_blank" href="https://ttplatform.ru/help">
          Руководство пользователя
        </UserGuideLink>
      </Footer>
    </div>
  );
};
