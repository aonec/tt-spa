import React, { FC } from 'react';
import { Link, Title, Wrap, LinkArrowIcon } from './SidePanel.styled';
import { SidePanelProps } from './SidePanel.types';

export const SidePanel: FC<SidePanelProps> = ({ title, link }) => {
  return (
    <Wrap>
      <Title>{title}</Title>
      <Link to={link}>
        Перейти
        <LinkArrowIcon />
      </Link>
    </Wrap>
  );
};
