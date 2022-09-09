import React, { FC } from 'react';
import { Wrapper } from './Button.styled';
import { ButtonProps } from './Button.types';

export const Button: FC<ButtonProps> = (props) => {
  return (
    <Wrapper {...props} type={props.type || 'default'}>
      {props.children}
    </Wrapper>
  );
};
