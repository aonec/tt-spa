import React, { FC, useState } from 'react';
import { MenuContainer } from 'services/menuService';
import { MenuWrapper, Wrapper } from './Panel.styled';
import { Logo } from './Logo';

export const Panel: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const content = (
    <Wrapper>
      <Logo isOpen={isOpen} setIsOpen={setIsOpen} />
      <MenuWrapper>
        <MenuContainer />
      </MenuWrapper>
    </Wrapper>
  );

  return content;
};
