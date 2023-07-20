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
  icon = AlertIconType.info,
  type = AlertType.default,
}) => {
  const icons: { [key in AlertIconType]: React.FC } = {
    [AlertIconType.info]: InfoIcon,
    [AlertIconType.stop]: StopIcon,
    [AlertIconType.warning]: WarningIcon,
    [AlertIconType.incorrect]: IncorrectConfigurationIcon,
  };

  const Icon = icons[icon];
  const color = AlertColorLookup[type];

  return (
    <AlertWrap color={color}>
      <IconWrapper color={color}>
        <Icon />
      </IconWrapper>
      <Wide>{children}</Wide>
    </AlertWrap>
  );
};
