import React from 'react';
import styled from 'styled-components';
import { Flex } from '../Layout/Flex';
import { Space } from '../Layout/Space/Space';
import { ReactComponent as InfoIcon } from './icons/info.svg';

interface Props {}

export const Alert: React.FC<Props> = ({ children }) => {
  return (
    <AlertWrap>
      <InfoIcon />
      <Space />
      <div>{children}</div>
    </AlertWrap>
  );
};

export const AlertWrap = styled(Flex)`
  background: #189ee916;
  border-left: 2px solid #189ee9;
  padding: 10px 18px;
`;
