import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { SubMenuItemProps } from './SubMenuItem.types';
import { SubMenuItemTitle } from './SubMenuItem.styled';
import './SubMenuItem.styles.scss';

export const SubMenuItem: FC<SubMenuItemProps> = ({ subMenuItem }) => {
  const { title, path } = subMenuItem;

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? 'active-submenu-item-nav-link' : 'submenu-item-nav-link'
      }
    >
      <SubMenuItemTitle>{title}</SubMenuItemTitle>
    </NavLink>
  );
};
