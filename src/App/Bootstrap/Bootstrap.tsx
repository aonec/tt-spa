import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { store } from '01/Redux/store';
import { useApp } from 'hooks/useApp';
import { YMaps } from '@pbe/react-yandex-maps';

export const Bootstrap: FC = ({ children }) => {
  const AppProvider = useApp();

  return (
    <Provider store={store}>
      <AppProvider>
        <YMaps
          query={{
            apikey: 'a3a2f1cb-0246-4933-8004-db07a669deb7',
          }}
        >
          <ConfigProvider locale={ruRu}>{children}</ConfigProvider>
        </YMaps>
      </AppProvider>
    </Provider>
  );
};
