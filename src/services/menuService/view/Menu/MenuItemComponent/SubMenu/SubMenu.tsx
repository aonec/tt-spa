import React, { FC } from 'react';
import { Wrapper } from './SubMenu.styled';
import { SubMenuProps } from './SubMenu.types';
import { SubMenuItem } from './SubMenuItem';

export const SubMenu: FC<SubMenuProps> = ({ subMenuItems }) => {
  return (
    <Wrapper>
      {subMenuItems.map((elem) => (
        <SubMenuItem subMenuItem={elem} key={elem.path} />
      ))}
    </Wrapper>
  );
};
