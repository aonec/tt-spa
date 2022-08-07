import React from 'react';
import styled from 'reshadow/macro';
import { Route, Switch, Redirect } from 'react-router-dom';
import '01/css/index.scss';
import '01/css/styles.css';
import { app } from '01/styles/app';
import { Logotip } from '01/components';
import moment from 'moment';
import { Provider } from 'react-redux';
import 'moment/locale/ru';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';
import { YMaps } from 'react-yandex-maps';
import {
  Login,
  TaskProfile,
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
  IndividualDeviceEdit,
} from '../_pages';
import { useApp } from './useApp';
import EditODPU from '../_pages/EditHousingMeteringDevice';
import { Devices } from '../_pages/ObjectProfile/components/Devices';
import { store } from '../Redux/store';
import { DevicesFromSearch } from '../_pages/Devices';
import '../features/init';
import { ApartmentsRouteGroup } from './routeGroups/ApartmentsRouteGroup';
import { StatisticsPage } from '01/features/statistics';
import { ApartmentActs } from '01/features/actsJournal/displayActsJournal';
import styledC from 'styled-components';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { ReportsPageContainer } from '01/features/reports';
import { NodeArchivePageContainer } from '01/features/nodes/nodeArchiveService';
import { SettingsPageContainer } from '../features/settings/SettingsPageContainer';
import { ObjectsProfileContainer } from 'services/objects/objectsProfileService';
import { DevicesProfileContainer } from 'services/devices/devicesProfileService';
import { MenuContainer } from 'services/menuService';
import { EditManagingFirmUserPage } from '01/features/staff/managingFirmUser/editManagingFirmUser';
import {
  TasksProfileContainer,
  tasksProfileService,
} from 'services/tasks/tasksProfileService';
import { ChangeODPUContainer } from 'services/devices/сhangeODPUService';
import { EditElectricNodeContainer } from 'services/devices/editElectricNodeService';

moment.locale('ru');

const Internal = () => {
  const roles = JSON.parse(localStorage.getItem('roles')) ?? [];
  const TasksIsOpen = tasksProfileService.gates.TasksIsOpen;
  return styled(app)(
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/logout" render={() => 'logout'} />
      <Route path="/error/" render={() => <ErrorPage />} />
      <Route path="/registration*" render={() => <Registration />} />
      <Route path="/access-denied/" render={() => <AccessDeniedPage />} />
      <Route path="/">
        <layout>
          <LeftBlock style={{ position: 'fixed', height: '100vh' }}>
            <Logotip />
            <Space />
            <MenuContainer />
          </LeftBlock>
          <div />
          <main>
            <Switch>
              <Redirect
                from="/"
                to={
                  roles.includes('ManagingFirmOperator')
                    ? '/meters/apartments'
                    : '/tasks/list/Executing'
                }
                exact
              />
              <Redirect from="/tasks" to="/tasks/list/Executing" exact />

              <Route path="/actsJournal" exact>
                <ApartmentActs />
              </Route>

              <Route path="/tasks">
                <TasksIsOpen />
                <Route
                  path="/tasks/profile/(\\d+)"
                  component={TaskProfile}
                  exact
                />
                <Route
                  path="/tasks/list/:grouptype"
                  component={TasksProfileContainer}
                  exact
                />
              </Route>

              <Route
                path="/devices/"
                component={DevicesProfileContainer}
                exact
              />

              <Route
                path="/changeODPU/:oldDeviceId"
                component={ChangeODPUContainer}
                exact
              />

              <Route
                path="/electricNode/:deviceId/edit"
                component={EditElectricNodeContainer}
              />

              <Route
                path="/objects/:housingStockId(\\d+)/(apartments|devices)?"
                component={ObjectProfile}
                exact
              />

              <Route
                path="/objects/:searchType?"
                component={ObjectsProfileContainer}
                exact
              />

              <Route path="/devices/" component={DevicesFromSearch} exact />

              <Route path="/companyProfile/editManagingFirmUser/:id" exact>
                <EditManagingFirmUserPage />
              </Route>
              <Route path="/companyProfile/:section?" component={Settings} />
              <Route path="/companyProfile/staff/:id" component={Settings} />

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
                path="/nodes/:nodeId/(stats|connection|readings|related|documents|checks)?"
                component={NodeProfile}
                exact
              />

              <Route
                path="/nodes/:nodeId(\\d+)/edit"
                component={EditNode}
                exact
              />

              <Route
                path={['/housingMeteringDevices/:deviceId/']}
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
                path="/objects/:housingStockId(\\d+)/add_node"
                component={AddNode}
                exact
              />

              <Route
                path="/objects/(\\d+)/apartments/(\\d+)/(testimony|documents|actsJournal)?"
                component={ApartmentProfile}
                exact
              />
              <Route
                path="/individualDevices/:deviceId"
                component={IndividualDevice}
                exact
              />

              <Route
                path="/individualDevices/:deviceId/edit"
                component={IndividualDeviceEdit}
                exact
              />

              <Redirect from="/meters/" to="/meters/apartments" exact />

              <Route
                path="/meters/(apartments|houses|accountingNodes)"
                component={MetersPage}
              />

              <Route
                path="/nodeArchive/:nodeId"
                component={NodeArchivePageContainer}
                exact
              />

              <Route
                path="/settings/:section"
                component={SettingsPageContainer}
                exact
              />

              <Redirect
                from="/statistics/"
                to="/statistics/subscribersConsumption"
                exact
              />

              <Route path="/statistics/(subscribersConsumption|tasks|resourceConsumption)">
                <StatisticsPage />
              </Route>

              <Route path="/reports" component={ReportsPageContainer} exact />
            </Switch>
            <ApartmentsRouteGroup />
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

const LeftBlock = styledC.div`
  z-index: 2;
  padding-top: 20px; 
  width: 208px;
  background: #F3F5F6;
`;

export default App;
