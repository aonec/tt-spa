import React, { FC } from 'react';
import { Loader } from '01/components';
import { IconWrapper, Wrapper } from './Button.styled';
import { ButtonProps } from './Button.types';

export const Button: FC<ButtonProps> = (props) => {
  const {
    icon,
    type = 'default',
    className,
    onClick,
    disabled = props.isLoading,
    size = 'middle',
    isLoading,
  } = props;

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
      size={size}
    >
      {props.children}
      {icon && !isLoading && <IconWrapper>{icon}</IconWrapper>}
      {isLoading && (
        <IconWrapper>
          <Loader show />
        </IconWrapper>
      )}
    </Wrapper>
  );
};
