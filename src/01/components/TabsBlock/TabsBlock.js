/* eslint-disable */

import React from 'react';
import { Route, NavLink, useRouteMatch, Switch } from 'react-router-dom';

const tasks = [
    ['К исполнению', 'executing'],
    ['Наблюдаемые', 'observing'],
    ['Архив', 'archived'],
  ],
  objectId = [
    ['Общие данные'],
    ['Квартиры', 'apartments'],
    ['ОДПУ', 'devices'],
  ],
  deviceId = [['Общие данные'], ['Приборы учета', 'devices']],
  meters = [['По квартирам'], ['По домам', 'houses']],
  settings = [
    ['Общие данные'],
    ['Сотрудники', 'users'],
    ['Подрядчики', 'contractors'],
  ];

const Tab = ({ match, name, url, ...props }) => (
  <NavLink
    to={url ? `${match.url}/${url}` : match.url}
    exact={!url}
    activeClassName={styles.active}
    {...props}
  >
    {name}
  </NavLink>
);

export const TabsBlock = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={['/object/(\\d+)']}>
        <tabbl>
          {objectId.map(({ 0: name, 1: url }) => (
            <Tab key={name} {...{ match, name, url }} />
          ))}
        </tabbl>
      </Route>
      <Route path="/tasks/">
        <tabbl>
          {tasks.map(({ 0: name, 1: url }) => (
            <Tab key={name} {...{ match, name, url }} />
          ))}
        </tabbl>
      </Route>
      <Route path="/meters/">
        <tabbl>
          {meters.map(({ 0: name, 1: url }) => (
            <Tab
              key={name}
              {...{ match, name, url }}
              to={url ? `${match.path}${url}` : match.path}
              isActive={(m, l) => {
                const houses = l.pathname.match(/houses/gi);
                if (url && houses) return true;
                if (!url && !houses) return true;
              }}
            />
          ))}
        </tabbl>
      </Route>
      <Route path="/settings/">
        <tabbl>
          {settings.map(({ 0: name, 1: url }) => (
            <Tab
              key={name}
              {...{ match, url, name }}
              to={url ? `${match.path}${url}` : match.path}
            />
          ))}
        </tabbl>
      </Route>
    </Switch>
  );
};
