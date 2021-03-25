import React, { useEffect } from 'react';
import styled from 'reshadow/macro';
import { Route, Switch, Redirect } from 'react-router-dom';
import '01/css/index.css';
import '01/css/styles.css';
import { app } from '01/styles/app';
import { Logotip, Menu } from '01/components';
import moment from 'moment';

import { Provider, useDispatch, useSelector } from 'react-redux';
import 'moment/locale/ru';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
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
  CalculatorProfile,
  HousingProfile,
  Settings,
  EditCalculator,
  UserProfile,
  Contractor,
  Registration,
  IndividualDevice,
  NodeProfile,
  EditNode,
  AddNode,
} from '../_pages';
import { useApp } from './useApp';
import DeviceSearchForm from '../_pages/Devices/components/DeviceSearchForm/DeviceSearchForm';
import EditODPU from '../_pages/EditODPU';
import { Devices } from '../_pages/ObjectProfile/components/Devices';
import { store } from '../Redux/store';
import { DevicesFromSearch } from '../_pages/Devices';
import { YMaps } from 'react-yandex-maps';

moment.locale('ru');

const Internal = () => {
  return styled(app)(
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" render={() => 'logout'} />
      <Route path="/error/" render={() => <ErrorPage />} />
      <Route path="/registration*" render={() => <Registration />} />
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
              <Redirect from={['/tasks', '/']} to="/tasks/executing" exact />
              <Route
                path="/tasks/(executing|observing|archived)/"
                component={Tasks}
              />
              <Route path="/tasks/(\\d+)" render={() => <TaskProfile />} />
              <Route path="/objects/" component={Objects} exact />
              <Route path="/devices/" component={DevicesFromSearch} exact />
              <Route
                path="/settings/(staff|contractors)?"
                component={Settings}
              />
              <Route path="/devices/(\\d+)" component={Devices} exact />

              <Route
                path={[
                  '/calculators/:deviceId/(connection|related|nodes|documents)?',
                ]}
                component={CalculatorProfile}
                exact
              />

              <Route
                path="/calculators/:deviceId/edit"
                component={EditCalculator}
                exact
              />

              <Route
                path={['/nodes/:nodeId/(stats|connection|related|documents)?']}
                component={NodeProfile}
                exact
              />

              <Route
                path="/nodes/:nodeId(\\d+)/edit"
                component={EditNode}
                exact
              />

              <Route
                path={[
                  '/housingMeteringDevices/:deviceId/(related|documents)?',
                ]}
                component={HousingProfile}
                exact
              />

              <Route
                path={['/user/:userId', '/user/staff/:userId']}
                component={UserProfile}
                exact
              />

              <Route
                path={['/user/:userId', '/user/contractor/:userId']}
                component={Contractor}
                exact
              />

              <Route
                path="/housingMeteringDevices/:deviceId/edit_odpu/"
                component={EditODPU}
                exact
              />

              <Route
                path="/objects/:housingStockId(\\d+)/(apartments|devices)?"
                component={ObjectProfile}
                exact
              />

              <Route
                path="/objects/:housingStockId(\\d+)/add_node"
                component={AddNode}
                exact
              />

              <Route
                path="/objects/(\\d+)/apartments/(\\d+)/(testimony|documents|changes)?"
                component={ApartmentProfile}
                exact
              />
              <Route
                path="/individualDevices/(\\d+)/(readings|documents|changes)?"
                component={IndividualDevice}
                exact
              />

              <Redirect from="/meters/" to="/meters/apartments" exact />
              <Route
                path="/meters/(apartments|houses)"
                component={MetersPage}
              />
              <Redirect to="/error/" />
            </Switch>
          </main>
        </layout>
      </Route>
    </Switch>
  );
};

export function App() {
  const AppProvider = useApp();
  return styled(app)(
    <Provider store={store}>
      <AppProvider>
        <ConfigProvider locale={ruRu}>
          <YMaps>
            <Internal />
          </YMaps>
        </ConfigProvider>
      </AppProvider>
    </Provider>
  );
}

export default App;
