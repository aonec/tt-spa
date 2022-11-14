import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { useApp } from '01/App/useApp';
import { store } from '01/Redux/store';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';

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
