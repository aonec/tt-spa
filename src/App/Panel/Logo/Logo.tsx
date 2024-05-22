import React, { FC } from 'react';
import {
  ChevronWrapper,
  CompanyName,
  LogoImg,
  LogoWrapper,
  Wrapper,
} from './Logo.styled';
import logoEmblemMini from './assets/logoEmblemMini.svg';
import { DoubleChevronLeft } from 'ui-kit/icons';

export const Logo: FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoImg src={logoEmblemMini} alt="logotip" />
        <div>
          <CompanyName>TT</CompanyName>
          Management
        </div>
      </LogoWrapper>
      <ChevronWrapper isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <DoubleChevronLeft />
      </ChevronWrapper>
    </Wrapper>
  );
};
