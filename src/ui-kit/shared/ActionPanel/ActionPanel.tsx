import React, { FC } from 'react';
import {
  GroupWrrapper,
  IconWrapper,
  PanelWrapper,
  TextWrapper,
} from './ActionPanel.styled';
import { ActionPanelProps } from './ActionPanel.types';

export const ActionPanel: FC<ActionPanelProps> = ({
  text,
  onClick,
  icon,
  additionalInfo,
}) => {
  return (
    <PanelWrapper onClick={onClick}>
      <GroupWrrapper>
        <IconWrapper>{icon}</IconWrapper>
        <TextWrapper>{text}</TextWrapper>
      </GroupWrrapper>
      <GroupWrrapper>{additionalInfo}</GroupWrrapper>
    </PanelWrapper>
  );
};
