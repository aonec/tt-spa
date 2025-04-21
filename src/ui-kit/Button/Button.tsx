import React, { FC } from 'react';
import { ButtonProps } from './Button.types';
import { ButtonSC } from './Button.styled';
import { Loader } from 'ui-kit/Loader';

export const Button: FC<ButtonProps> = (props) => {
  const {
    icon,
    type = 'primary',
    isLoading,
    size = 'middle',
    disabled = false,
    floating,
    htmlForm,
    htmlType,
    color,
    ...antdProps
  } = props;

  return (
    <ButtonSC
      {...antdProps}
      size={size}
      btnType={type}
      floating={floating}
      disabled={disabled || isLoading}
      form={htmlForm}
      htmlType={htmlType}
      color={color}
    >
      {props.children}
      {!isLoading && icon}
      {isLoading && <Loader show />}
    </ButtonSC>
  );
};
