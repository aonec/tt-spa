import React, { FC } from 'react';
import { Wrapper } from './Title.styled';
import { TitleProps } from './Title.types';

export const Title: FC<TitleProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
