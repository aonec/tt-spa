/* eslint-disable */

import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const tabItems = [
  ['Общая информация', ''],
  ['Настройки соединения', 'connection'],
  ['Подключенные приборы', 'related'],
  ['Документы', 'documents'],
];

export const Tabs = React.memo(() => {
  const { url } =
    useRouteMatch('/*/*/devices/(\\d+)/') ||
    useRouteMatch('/calculators/(\\d+)');
  return (
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
