import React from 'react';
import styled from 'styled-components';
import {
  IncorrectConfigurationIcon,
  InfoIcon,
  StopIcon,
  WarningIcon,
} from 'ui-kit/icons';
import { Space } from '../Layout/Space/Space';
import { IconWrapper } from './Alert.styled';

interface Props {
  type?: 'info' | 'stop' | 'warning' | 'incorrect';
  color?: string;
  iconColor?: string;
}

export const Alert: React.FC<Props> = ({
  children,
  type = 'info',
  color,
  iconColor,
}) => {
  const icons = {
    info: InfoIcon,
    stop: StopIcon,
    warning: WarningIcon,
    incorrect: IncorrectConfigurationIcon,
  };

  const Icon = icons[type];

  return (
    <AlertWrap color={color}>
      <IconWrapper color={iconColor}>
        <Icon />
      </IconWrapper>
      <Space />
      <Wide>{children}</Wide>
    </AlertWrap>
  );
};

interface AlertWrapProps {
  color?: string;
}

export const AlertWrap = styled.div`
  display: flex;
  align-items: flex-start;

  background: ${({ color }: AlertWrapProps) => `#${color || '189ee9'}35`};
  border-left: 2px solid
    ${({ color }: AlertWrapProps) => `#${color || '189ee9'}`};
  padding: 10px 18px;
  color: #272f5a;
`;

const Wide = styled.div`
  width: 100%;
`;
