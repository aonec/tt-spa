import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { store } from '01/Redux/store';
import { useApp } from 'hooks/useApp';

export const Bootstrap: FC = ({ children }) => {
  const AppProvider = useApp();

  return (
    <Provider store={store}>
      <AppProvider>
        <ConfigProvider locale={ruRu}>{children}</ConfigProvider>
      </AppProvider>
    </Provider>
  );
};
