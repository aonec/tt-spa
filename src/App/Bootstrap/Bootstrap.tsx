import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { useApp } from './Bootstrap.hook';
import { YMaps } from '@pbe/react-yandex-maps';
import { BootstrapProps } from './Bootstrap.types';
import { Fallback } from 'App/Fallback';

export const Bootstrap: FC<BootstrapProps> = ({ children }) => {
  useApp();

  return (
    <>
      <Fallback>
        <ConfigProvider
          locale={ruRu}
          theme={{ token: { colorPrimary: '#189EE9' } }}
        >
          <YMaps
            query={{
              apikey: 'a3a2f1cb-0246-4933-8004-db07a669deb7',
            }}
          >
            {children}
          </YMaps>
        </ConfigProvider>
      </Fallback>
    </>
  );
};
