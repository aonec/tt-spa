import React, { FC } from 'react';
import { CompanyName, Wrapper } from './Logo.styled';
import logo from '01/assets/svg/logo.svg';

export const Logo: FC = () => {
  return (
    <Wrapper>
      <img src={logo} alt="logotip" />
      <CompanyName>TT</CompanyName>
      Management
    </Wrapper>
  );
};
