import React, { FC } from 'react';
import { Loader } from '01/components';
import { ButtonProps } from './Button.types';
import { Button as ButtonAntd } from 'antd';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

export const Button: FC<ButtonProps> = (props) => {
  const {
    icon,
    type = 'default',
    className,
    isLoading,
    size = 'middle',
    disabled = false,
    floating,
    ...antdProps
  } = props;

  const cx = classNames.bind(styles);

  return (
    <ButtonAntd
      {...antdProps}
      disabled={disabled || isLoading}
      className={cx(className, 'btn', `btn-${type}`, `btn-${size}`, {
        'btn-float': floating,
      })}
    >
      {props.children}
      {icon && !isLoading && (
        <div className={styles['iconWrapper']}>{icon}</div>
      )}
      {isLoading && (
        <div className={styles['iconWrapper']}>
          <Loader show />
        </div>
      )}
    </ButtonAntd>
  );
};
