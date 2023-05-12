import React, { FC } from 'react';
import { ButtonProps } from './Button.types';
import { ButtonSC, IconWrapper } from './Button.styled';
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
    >
      {props.children}
      {icon && !isLoading && <IconWrapper>{icon}</IconWrapper>}
      {isLoading && (
        <IconWrapper>
          <Loader show />
        </IconWrapper>
      )}
    </ButtonSC>
  );
};
