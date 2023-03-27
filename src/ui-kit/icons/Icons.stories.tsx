import * as Icons from './';
import React from 'react';
import styles from './Icons.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default {
  title: 'Icons',
};

export const All = () => (
  <div className={cx('iconsList-root')}>
    {Object.entries(Icons).map(([name, Icon]) => (
      <div className={cx('icon-root')}>
        <div>
          <Icon />
        </div>
        - {name}
      </div>
    ))}
  </div>
);
