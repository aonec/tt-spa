import React, { FC } from 'react';
import {
  ChevronIconSC,
  GroupWrrapper,
  IconWrapper,
  PanelWrapper,
  TextWrapper,
} from './LinkPanel.styled';
import { LinkPanelProps } from './LinkPanel.types';

export const LinkPanel: FC<LinkPanelProps> = ({ text, link, icon }) => {
  return (
    <PanelWrapper to={link}>
      <GroupWrrapper>
        <IconWrapper>{icon}</IconWrapper>
        <TextWrapper>{text}</TextWrapper>
      </GroupWrrapper>
      <ChevronIconSC />
    </PanelWrapper>
  );
};
