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
  isChevronOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen, isChevronOpen }) => {
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoImg src={logoEmblemMini} alt="logotip" />
        {isOpen && (
          <div>
            <CompanyName>TT</CompanyName>
            Management
          </div>
        )}
      </LogoWrapper>
      {isOpen && (
        <ChevronWrapper
          isOpen={isChevronOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <DoubleChevronLeft />
        </ChevronWrapper>
      )}
    </Wrapper>
  );
};
