import React, { FC } from 'react';
import { SubMenuItemProps } from './SubMenuItem.types';
import { SubMenuItemTitle, SubMenuItemWrapper } from './SubMenuItem.styled';
import './SubMenuItem.styles.scss';

export const SubMenuItem: FC<SubMenuItemProps> = ({ subMenuItem }) => {
  const { title, path } = subMenuItem;

  return (
    <SubMenuItemWrapper to={path} activeClassName="active-menu-item-nav-link">
      <SubMenuItemTitle>{title}</SubMenuItemTitle>
    </SubMenuItemWrapper>
  );
};
