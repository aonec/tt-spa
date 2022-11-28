import React, { FC } from 'react';
import { Wrapper } from './LinkButton.styled';
import { LinkButtonProps } from './LinkButton.types';

export const LinkButton: FC<LinkButtonProps> = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};
