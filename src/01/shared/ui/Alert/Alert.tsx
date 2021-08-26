import React from 'react';
import styled from 'styled-components';
import { Flex } from '../Layout/Flex';
import { Space } from '../Layout/Space/Space';
import { ReactComponent as InfoIcon } from './icons/info.svg';
import { ReactComponent as StopIcon } from './icons/stop.svg';

interface Props {
  type?: 'info' | 'stop';
}

export const Alert: React.FC<Props> = ({ children, type = 'info' }) => {
  const icons = {
    info: InfoIcon,
    stop: StopIcon,
  };

  const Icon = icons[type];

  return (
    <AlertWrap>
      <Icon />
      <Space />
      <Wide>{children}</Wide>
    </AlertWrap>
  );
};

export const AlertWrap = styled(Flex)`
  background: #189ee916;
  border-left: 2px solid #189ee9;
  padding: 10px 18px;
`;

const Wide = styled.div`
  width: 100%;
`;
