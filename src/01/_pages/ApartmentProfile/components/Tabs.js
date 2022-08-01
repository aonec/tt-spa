/* eslint-disable */

import React from 'react';
import styled from '@reshadow/macro';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { tabs } from '../../../r_comp';


const tabItems = [
  ['Общие данные', ''],
  ['Приборы учёта', 'testimony'],
  ['Журнал актов', 'actsJournal'],
];

export const Tabs = React.memo(() => {
  const { url } = useRouteMatch('/*/*/apartments/:apartmentId');
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
