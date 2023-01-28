import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { useApp } from 'hooks/useApp';

export const Bootstrap: FC = ({ children }) => {
  const AppProvider = useApp();

  return (
      <AppProvider>
        <ConfigProvider locale={ruRu}>{children}</ConfigProvider>
      </AppProvider>
  );
};
