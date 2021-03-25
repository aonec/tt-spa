import React from 'react';
import { Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import styles from './loader.module.scss';

export const LoaderTT = () => {
  const antIcon = <SyncOutlined spin />;
  return <Spin indicator={antIcon} className={styles.loader} />;
};
