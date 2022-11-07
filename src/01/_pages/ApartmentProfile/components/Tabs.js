import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const tabItems = [
  ['Общие данные', ''],
  ['Собственники', 'homeowners'],
  ['Приборы учёта', 'testimony'],
  ['Журнал актов', 'actsJournal'],
];

export const Tabs = React.memo(() => {
  const { url } = useRouteMatch('/*/*/apartments/:apartmentId');
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
