import React, { FC } from 'react';
import { MenuContainer } from 'services/menuService';
import { MenuWrapper, Wrapper } from './Panel.styled';
import { Logo } from './Logo';

export const Panel: FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onMouseLeave?: () => void;
  onMouseEnter?: () => void;
  isChevronOpen: boolean;
}> = ({ isOpen, setIsOpen, onMouseLeave, onMouseEnter, isChevronOpen }) => {
  const content = (
    <Wrapper
      isOpen={isOpen}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <Logo
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isChevronOpen={isChevronOpen}
      />
      <MenuWrapper>
        <MenuContainer isOpen={isOpen} />
      </MenuWrapper>
    </Wrapper>
  );

  return content;
};
