import React from 'react';
import classNames from 'classnames/bind';
import {
  IncorrectConfigurationIcon,
  InfoIcon,
  StopIcon,
  WarningIcon,
} from 'ui-kit/icons';
import { AlertProps } from './Alert.types';
import styles from './Alert.module.scss';

const cx = classNames.bind(styles);

const iconsLookup = {
  info: InfoIcon,
  stop: StopIcon,
  warning: WarningIcon,
  incorrect: IncorrectConfigurationIcon,
};

export const Alert = ({
  children,
  icon,
  type = 'default',
  centered,
}: AlertProps) => {
  const Icon = iconsLookup[icon];

  return (
    <div className={cx('root', type, { centered })}>
      <Icon className={cx('icon')} />
      <div className={cx('text')}>{children}</div>
    </div>
  );
};
