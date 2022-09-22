/* eslint-disable */

import React from 'react';
import styled from 'styled-components';
// import logo from '01/assets/svg/logo.svg';
import logoLeroy from './Leroy_Merlin.png';

export const Logotip = () => {
  return <Logo alt="logo" src={logoLeroy} />;
};

const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-left: 40px;
`;
