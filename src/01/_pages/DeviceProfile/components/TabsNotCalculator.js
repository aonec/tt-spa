/* eslint-disable */

import React from 'react';
import styled from '@reshadow/macro';
import { NavLink, useRouteMatch } from 'react-router-dom';

import { tabs } from '01/r_comp';

const tabItems = [
  ['Общая информация', ''],
  ['Подключенные приборы', 'related'],
  ['Документы', 'documents'],
];

export const TabsNotCalculator = React.memo(() => {
  const { url } =
    useRouteMatch('/*/*/devices/(\\d+)/') ||
    useRouteMatch('/housingMeteringDevices/(\\d+)');
  return styled(tabs)(
    <tabs>
      {tabItems.map((t) => (
        <NavLink
          key={t[0]}
          to={t[1] ? `${url}/${t[1]}` : url}
          activeClassName={tabs.active}
          replace
          exact={!t[1]}
        >
          {t[0]}
        </NavLink>
      ))}
    </tabs>
  );
});
