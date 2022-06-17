import React, { FC } from 'react';
import { MenuItemTitle, MenuItemWrapper } from './MenuItemComponent.styled';
import { MenuItemComponentProps } from './MenuItemComponent.types';
import './MenuItemComponent.styles.scss';

export const MenuItemComponent: FC<MenuItemComponentProps> = ({ menuItem }) => {
  const { title, icon: Icon, path } = menuItem;

  return (
    <MenuItemWrapper to={path} activeClassName="active-menu-item-nav-link">
      <Icon className="menu-item-icon" />
      <MenuItemTitle>{title}</MenuItemTitle>
    </MenuItemWrapper>
  );
};
