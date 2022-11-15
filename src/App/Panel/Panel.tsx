import { Logotip } from '01/components';
import React, { FC } from 'react';
import { MenuContainer } from 'services/menuService';
import { MenuWrapper, Wrapper } from './Panel.styled';
import { PanelProps } from './Panel.types';

export const Panel: FC<PanelProps> = ({}) => {
  return (
    <Wrapper>
      <Logotip />
      <MenuWrapper>
        <MenuContainer />
      </MenuWrapper>
    </Wrapper>
  );
};
