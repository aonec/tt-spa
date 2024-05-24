import React, { FC, useCallback, useState } from 'react';
import { Chevron, MenuItemTitle } from './MenuItemComponent.styled';
import { MenuItemComponentProps } from './MenuItemComponent.types';
import './MenuItemComponent.styles.scss';
import { SubMenu } from './SubMenu';
import { Wrapper } from './MenuItemComponent.styled';
import { NavLink } from 'react-router-dom';

export const MenuItemComponent: FC<MenuItemComponentProps> = ({
  menuItem,
  isMenuOpen,
}) => {
  const { title, icon: Icon, path } = menuItem;
  const [isOpen, setIsOpen] = useState(false);

  const isSubMenuItemsExist = Boolean(menuItem.sub?.length);
  const isShowSubMenu = isOpen && isSubMenuItemsExist;

  const toggleChevron = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  const openSubMenu = useCallback(() => setIsOpen(true), []);

  return (
    <>
      <Wrapper>
        <NavLink
          onClick={openSubMenu}
          to={path}
          className={({ isActive }) => {
            return isActive
              ? 'active-menu-item-nav-link'
              : 'menu-item-nav-link';
          }}
        >
          {Icon && <Icon className="menu-item-icon" />}
          {isMenuOpen && <MenuItemTitle>{title}</MenuItemTitle>}
        </NavLink>
        {isSubMenuItemsExist && isMenuOpen && (
          <Chevron open={isOpen} onClick={toggleChevron} />
        )}
      </Wrapper>
      {isShowSubMenu && isMenuOpen && <SubMenu subMenuItems={menuItem.sub!} />}
    </>
  );
};
