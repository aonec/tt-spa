import React, { FC } from 'react';
import { IconWrapper, Wrapper } from './Title.styled';
import { TitleProps } from './Title.types';

export const Title: FC<TitleProps> = ({ children, icon }) => {
  return (
    <Wrapper>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </Wrapper>
  );
};
