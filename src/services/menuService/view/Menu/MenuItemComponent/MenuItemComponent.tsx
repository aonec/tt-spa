import React, { FC, useCallback, useState } from 'react';
import {
  Chevron,
  MenuItemTitle,
  MenuItemWrapper,
} from './MenuItemComponent.styled';
import { MenuItemComponentProps } from './MenuItemComponent.types';
import './MenuItemComponent.styles.scss';
import { SubMenu } from './SubMenu';

import { Wrapper } from './MenuItemComponent.styled';

export const MenuItemComponent: FC<MenuItemComponentProps> = ({ menuItem }) => {
  const { title, icon: Icon, path } = menuItem;
  const [isOpen, setIsOpen] = useState(false);

  const isSubMenuItemsExist = Boolean(menuItem.sub?.length);
  const isShowSubMenu = isOpen && isSubMenuItemsExist;

  const toggleChevron = useCallback(() => setIsOpen(isOpen => !isOpen), []);

  return (
    <>
      <Wrapper>
        <MenuItemWrapper to={path} activeClassName="active-menu-item-nav-link">
          <Icon className="menu-item-icon" />
          <MenuItemTitle>{title}</MenuItemTitle>
        </MenuItemWrapper>
        {isSubMenuItemsExist && <Chevron isOpen={isOpen} onClick={toggleChevron} />}
      </Wrapper>
      {isShowSubMenu && <SubMenu subMenuItems={menuItem.sub!} />}
    </>
  );
};
