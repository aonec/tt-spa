import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { useApp } from './Bootstrap.hook';
import { YMaps } from '@pbe/react-yandex-maps';
import { Analytics } from '@vercel/analytics/react';

export const Bootstrap: FC = ({ children }) => {
  useApp();

  return (
    <>
      <Analytics />
      <ConfigProvider locale={ruRu}>
        <YMaps
          query={{
            apikey: 'a3a2f1cb-0246-4933-8004-db07a669deb7',
          }}
        >
          {children}
        </YMaps>
      </ConfigProvider>
    </>
  );
};
