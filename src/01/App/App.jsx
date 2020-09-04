import React from 'react';
import styled from 'reshadow/macro';
import { Route, Switch, Redirect } from 'react-router-dom';
import '01/css/index.css';
import '01/css/styles.css';
import { app } from '01/styles/app';
import { Logotip, Menu } from '01/components';
import {
  Tasks,
  Login,
  TaskProfile,
  Objects,
  ObjectProfile,
  DeviceProfile,
  MetersPage,
  ApartmentProfile,
  ErrorPage,
  AccessDeniedPage,
} from '01/_pages';
import moment from 'moment';
import { useApp } from './useApp';

// библиотека обработки дат и локализация СНГ
import 'moment/locale/ru';

moment.locale('ru');

export function App() {
  const AppProvider = useApp();
  return styled(app)(
    <AppProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" render={() => 'logout'} />
        {/* <Route path="/error/" render={() => "404"} /> */}
        <Route path="/error/" render={() => <ErrorPage />} />
        <Route path="/access-denied/" render={() => <AccessDeniedPage />} />
        <Route path="/">
          <layout>
            <menu as="div">
              <Logotip />
              <Menu />
            </menu>
            <main>
              <Switch>
                <Redirect from="/tasks" to="/tasks/executing" exact />
                <Route
                  path="/tasks/(executing|observing|archived)/"
                  component={Tasks}
                />
                <Route path="/tasks/(\\d+)" component={TaskProfile} />
                <Route path="/objects/" component={Objects} exact />
                <Route
                  path="/objects/(\\d+)/devices/(\\d+)/(connection|documents|changes)?"
                  component={DeviceProfile}
                  exact
                />
                <Route
                  path="/objects/(\\d+)/(apartments|devices)?"
                  component={ObjectProfile}
                  exact
                />

                <Route
                  path="/objects/(\\d+)/apartments/(\\d+)/(testimony|documents|changes)?"
                  component={ApartmentProfile}
                  exact
                />
                <Redirect from="/meters/" to="/meters/apartments" exact />
                <Route
                  path="/meters/(apartments|houses)"
                  component={MetersPage}
                />
                <Redirect to="/tasks/" />
              </Switch>
            </main>
          </layout>
        </Route>
      </Switch>
      {/* <Pages /> */}
    </AppProvider>,
  );
}

export default App;
