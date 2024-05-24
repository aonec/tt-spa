import React, { FC } from 'react';
import { MenuContainer } from 'services/menuService';
import { MenuWrapper, Wrapper } from './Panel.styled';
import { Logo } from './Logo';

export const Panel: FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  const content = (
    <Wrapper isOpen={isOpen}>
      <Logo isOpen={isOpen} setIsOpen={setIsOpen} isChevronOpen={isOpen} />
      <MenuWrapper>
        <MenuContainer isOpen={isOpen} />
      </MenuWrapper>
    </Wrapper>
  );

  return content;
};
