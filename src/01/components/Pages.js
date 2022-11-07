/* eslint-disable */

import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import { Menu } from '01/components/Menu';
import menuItems from '01/menu.json';
import { TasksPage } from '01/pages/TasksPage';
import { TasksIdPage } from '01/pages/TasksIdPage';
import { Objects, ObjectId } from '01/pages/ObjectPage';
import { MetersPage } from '01/pages/MetersPage';
import { SettingsPage } from '01/pages/SettitngsPage';

export const Pages = ({ children }) => {
  const authPage = useRouteMatch('/auth');
  if (authPage) return null;
  return (
    <main>
      <Menu list={menuItems} />
      <pages>
        <Switch>
          <Route path="/tasks/" component={TasksPage} />
          <Route path="/task/:taskId/" component={TasksIdPage} />
          <Route path="/object/:objectId/device/" render={() => 'device'} />
          <Route path="/object/:objectId/" component={ObjectId} />
          <Route path="/objects/" component={Objects} />
          <Route path="/meters/" component={MetersPage} />
          <Route path="/settings/" component={SettingsPage} />
        </Switch>
      </pages>
      {/* <TasksPage />
      <ObjectPage /> */}
    </main>
  );
};
