import React from 'react';
import styled from 'styled-components';
import { Flex } from '../Layout/Flex';
import { Space } from '../Layout/Space/Space';
import { ReactComponent as InfoIcon } from './icons/info.svg';
import { ReactComponent as StopIcon } from './icons/stop.svg';
import { ReactComponent as WarningIcon } from './icons/warning.svg'

interface Props {
  type?: 'info' | 'stop' | 'warning';
  color?: string;
}

export const Alert: React.FC<Props> = ({ children, type = 'info', color }) => {
  const icons = {
    info: InfoIcon,
    stop: StopIcon,
    warning: WarningIcon,
  };

  const Icon = icons[type];

  return (
    <AlertWrap color={color}>
      <Icon />
      <Space />
      <Wide>{children}</Wide>
    </AlertWrap>
  );
};

interface AlertWrapProps {
  color?: string;
}

export const AlertWrap = styled(Flex)`
  background: ${({ color }: AlertWrapProps) => `#${color || '189ee9'}16`};
  border-left: 2px solid
    ${({ color }: AlertWrapProps) => `#${color || '189ee9'}`};
  padding: 10px 18px;
`;

const Wide = styled.div`
  width: 100%;
`;
