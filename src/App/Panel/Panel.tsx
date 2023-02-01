import React, { FC } from 'react';
import { MenuContainer } from 'services/menuService';
import { MenuWrapper, Wrapper } from './Panel.styled';
import { Logo } from './Logo';

export const Panel: FC = () => {
  return (
    <Wrapper>
      <Logo />
      <MenuWrapper>
        <MenuContainer />
      </MenuWrapper>
    </Wrapper>
  );
};
