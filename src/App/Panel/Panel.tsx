import { Logotip } from '01/components';
import React, { FC } from 'react';
import { MenuContainer } from 'services/menuService';
import { MenuWrapper, Wrapper } from './Panel.styled';

export const Panel: FC = () => {
  return (
    <Wrapper>
      <Logotip />
      <MenuWrapper>
        <MenuContainer />
      </MenuWrapper>
    </Wrapper>
  );
};
