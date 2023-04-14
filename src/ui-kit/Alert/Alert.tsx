import React from 'react';
import {
  IncorrectConfigurationIcon,
  InfoIcon,
  StopIcon,
  WarningIcon,
} from 'ui-kit/icons';
import { Space } from '../../01/shared/ui/Layout/Space/Space';
import { AlertWrap, IconWrapper, Wide } from './Alert.styled';

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
