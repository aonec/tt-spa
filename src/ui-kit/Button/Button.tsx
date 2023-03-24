import React, { FC } from 'react';
import { Loader } from '01/components';
import { ButtonProps } from './Button.types';
import { Button as ButtonAntd } from 'antd';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

export const Button: FC<ButtonProps> = (props) => {
  const {
    icon,
    type = 'primary',
    className,
    isLoading,
    size = 'middle',
    disabled = false,
    long = false,
    floating,
    ...otherProps
  } = props;

  const cx = classNames.bind(styles);

  return (
    <ButtonAntd
      {...otherProps}
      disabled={disabled || isLoading}
      data-long={long}
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
