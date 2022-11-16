import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { store } from '01/Redux/store';
import { useApp } from 'hooks/useApp';
import { YMaps } from 'react-yandex-maps';

export const Bootstrap: FC = ({ children }) => {
  const AppProvider = useApp();

  return (
    <Provider store={store}>
      <AppProvider>
        <YMaps>
          <ConfigProvider locale={ruRu}>{children}</ConfigProvider>
        </YMaps>
      </AppProvider>
    </Provider>
  );
};
