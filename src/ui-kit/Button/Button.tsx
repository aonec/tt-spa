import React, { FC } from 'react';
import { Wrapper } from './Button.styled';
import { ButtonProps } from './Button.types';

export const Button: FC<ButtonProps> = (props) => {
  return (
    <Wrapper
      {...props}
      type={props.type || 'default'}
      onClick={props.disabled ? undefined : props.onClick}
      className={[
        props.className,
        ...(props.disabled ? ['tt-button-disabled'] : []),
      ].join(' ')}
    >
      {props.children}
    </Wrapper>
  );
};
