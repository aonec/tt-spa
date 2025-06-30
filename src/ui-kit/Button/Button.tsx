import React, { FC, useMemo } from 'react';
import classNames from 'classnames/bind';
import { Button as ButtonAntd } from 'antd';

import { Loader } from 'ui-kit/Loader';

import { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export const Button: FC<ButtonProps> = (props) => {
  const {
    size = 'm',
    type = 'primary',
    icon,
    isLoading,
    disabled = false,
    floating,
    htmlForm,
    htmlType,
    children,
    className,
  } = props;

  const rightElement = useMemo(() => {
    if (isLoading) {
      return <Loader show />;
    }

    return icon;
  }, [isLoading, icon]);

  return (
    <ButtonAntd
      className={cx('root', className, `size-${size}`, type, {
        'is-floating': floating,
      })}
      disabled={disabled || isLoading}
      form={htmlForm}
      htmlType={htmlType}
    >
      {children}
      {rightElement}
    </ButtonAntd>
  );
};
