import React, { FC } from 'react';
import { Loader } from '01/components';
import { IconWrapper } from './Button.styled';
import { ButtonProps } from './Button.types';
import { Button as ButtonAntd } from 'antd';
import styles from './Button.module.scss';

export const Button: FC<ButtonProps> = (props) => {
  const {
    icon,
    type = 'default',
    className,
    disabled = props.isLoading,
    size = 'middle',
    sidePadding,
    isLoading,
    ...otherProps
  } = props;

  return (
    <ButtonAntd
      {...otherProps}
      disabled={disabled}
      className={[
        styles['btn'],
        styles[`btn-${type}`],
        styles[`btn-${size}`],
      ].join(' ')}
    >
      {props.children}
      {icon && !isLoading && <IconWrapper>{icon}</IconWrapper>}
      {isLoading && (
        <IconWrapper>
          <Loader show />
        </IconWrapper>
      )}
    </ButtonAntd>
  );
};
