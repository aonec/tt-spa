import React from 'react';
import {
  IncorrectConfigurationIcon,
  InfoIcon,
  StopIcon,
  WarningIcon,
} from 'ui-kit/icons';
import { AlertWrap, IconWrapper, Wide } from './Alert.styled';
import {
  AlertColorLookup,
  AlertIconType,
  AlertProps,
  AlertType,
} from './Alert.types';

export const Alert: React.FC<AlertProps> = ({
  children,
  icon,
  type = AlertType.default,
  centered,
}) => {
  const icons: { [key in AlertIconType]: React.FC } = {
    [AlertIconType.info]: InfoIcon,
    [AlertIconType.stop]: StopIcon,
    [AlertIconType.warning]: WarningIcon,
    [AlertIconType.incorrect]: IncorrectConfigurationIcon,
  };

  const Icon = icon && icons[icon];
  const color = AlertColorLookup[type];

  return (
    <AlertWrap color={color} centered={centered}>
      <IconWrapper color={color}>{Icon ? <Icon /> : null}</IconWrapper>
      <Wide>{children}</Wide>
    </AlertWrap>
  );
};
