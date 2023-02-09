import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { useApp } from './Bootstrap.hook';

export const Bootstrap: FC = ({ children }) => {
  useApp();

  return <ConfigProvider locale={ruRu}>{children}</ConfigProvider>;
};
