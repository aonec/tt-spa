import React, { useEffect } from 'react';
import styled from 'reshadow/macro';
import { Route, Switch, Redirect } from 'react-router-dom';
import '01/css/index.css';
import '01/css/styles.css';
import { app } from '01/styles/app';
import { Logotip, Menu } from '01/components';
import { IndividualDevice } from '01/_pages/IndividualDevice';

import moment from 'moment';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
// библиотека обработки дат и локализация СНГ
import 'moment/locale/ru';
import thunkMiddleWare from 'redux-thunk';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import rootReducer from '../Redux/rootReducer';
import {
  Tasks,
  Login,
  TaskProfile,
  Objects,
  ObjectProfile,
  MetersPage,
  ApartmentProfile,
  ErrorPage,
  AccessDeniedPage,
  DevicesFromSearch,
  CalculatorProfile,
  HousingProfile,
  Settings,
  EditCalculator,
  UserProfile,
} from '../_pages';
import { useApp } from './useApp';
import DeviceSearchForm from '../_pages/Devices/components/DeviceSearchForm/DeviceSearchForm';
import EditODPU from '../_pages/EditODPU';
import { Devices } from '../_pages/ObjectProfile/components/Devices';

moment.locale('ru');

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log('Middleware', store.getState());
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(loggerMiddleware, thunkMiddleWare)),
);

window.store = store;

export function App() {
  const AppProvider = useApp();

  return styled(app)(
    <Provider store={store}>
      <AppProvider>
        <ConfigProvider locale={ruRu}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" render={() => 'logout'} />
            {/* <Route path="/error/" render={() => "404"} /> */}
            <Route path="/error/" render={() => <ErrorPage />} />
            <Route path="/access-denied/" render={() => <AccessDeniedPage />} />
            <Route path="/form/" render={() => <DeviceSearchForm />} />
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
                    <Route path="/tasks/(\\d+)" render={() => <TaskProfile />} />
                    <Route path="/objects/" component={Objects} exact />
                    <Route path="/devices/" component={DevicesFromSearch} exact />
                    <Route path="/settings/(staff|contractors)?" component={Settings} />
                    <Route path="/devices/(\\d+)" component={Devices} exact />

                    <Route
                      path={['/calculators/:deviceId/(connection|related|documents)?']}
                      component={CalculatorProfile}
                      exact
                    />

                    <Route
                      path={['/housingMeteringDevices/:deviceId/(related|documents)?']}
                      component={HousingProfile}
                      exact
                    />

                    <Route
                      path={['/user/:userId', '/user/(staff|contractor)/:userId']}
                      component={UserProfile}
                      exact
                    />

                    <Route
                      path="/calculators/:deviceId/edit"
                      component={EditCalculator}
                      exact
                    />
                    <Route
                      path="/housingMeteringDevices/:deviceId/edit_odpu/"
                      component={EditODPU}
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
                    <Route
                      path="/objects/(\\d+)/apartments/(\\d+)/devices/(\\d+)/(connection|documents)?"
                      component={IndividualDevice}
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
        </ConfigProvider>
      </AppProvider>
    </Provider>,
  );
}

export default App;

{ /* <Route */ }
{ /*  path={["/objects/:objid/devices/(\\d+)/(connection|related|documents)?", */ }
{ /*    "/housingMeteringDevices/:deviceId/(related|documents)?"]} */ }
{ /*  component={DeviceProfile} */ }
{ /*  exact */ }
{ /* /> */ }
