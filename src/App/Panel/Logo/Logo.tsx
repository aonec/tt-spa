import React, { FC } from 'react';
import { CompanyName, Wrapper } from './Logo.styled';
import logoEmblemMini from './assets/logoEmblemMini.svg';

export const Logo: FC = () => {
  return (
    <Wrapper>
      <img src={logoEmblemMini} alt="logotip" />
      <CompanyName>TT</CompanyName>
      Management
    </Wrapper>
  );
};
