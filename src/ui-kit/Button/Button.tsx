import React, { FC } from 'react';
import { IconWrapper, Wrapper } from './Button.styled';
import { ButtonProps } from './Button.types';

export const Button: FC<ButtonProps> = (props) => {
  const { icon, type = 'default', className, onClick, disabled } = props;

  const classNameString = [
    className,
    ...(disabled ? ['tt-button-disabled'] : []),
  ].join(' ');

  return (
    <Wrapper
      {...props}
      type={type}
      onClick={disabled ? undefined : onClick}
      className={classNameString}
    >
      {props.children}
      {icon && <IconWrapper>{icon}</IconWrapper>}
    </Wrapper>
  );
};
