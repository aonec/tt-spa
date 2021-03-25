import React from 'react';
import styled from 'reshadow/macro';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';

import { tabs } from '01/r_comp';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const tabItems: Array<Array<string>> = [
  ['Общая информация', ''],
  ['Подключенные приборы', 'related'],
  ['Документы', 'documents'],
];

interface MatchParams {
  isExact: boolean;
  params: object;
  path: string;
  url: string;
}

export const TabsHousingMeteringDevice = React.memo(() => {
  const { push } = useHistory();
  const matchParams =
    useRouteMatch<string>('/housingMeteringDevices/(\\d+)') || '';
  if (!matchParams) {
    return null;
  }
  const { url } = matchParams;
  const handleChange = (key: string) => {
    push(key !== '' ? `${url}/${key}` : url);
  };
  return (
    <Tabs onChange={handleChange} style={{ height: 'fit-content' }}>
      {tabItems.map((t, index) => {
        return <TabPane tab={t[0]} key={t[1]} />;
      })}
    </Tabs>
  );
});
