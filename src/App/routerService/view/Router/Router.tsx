import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout, PageWrapper, Wrapper } from './Router.styled';
import { RouterProps } from './Router.types';
import {
  AccessDeniedPage,
  AddNode,
  ApartmentProfile,
  CalculatorProfile,
  Contractor,
  DevicesFromSearch,
  EditCalculator,
  EditNode,
  ErrorPage,
  HousingProfile,
  IndividualDevice,
  IndividualDeviceEdit,
  Login,
  MetersPage,
  NodeProfile,
  Registration,
  Settings,
  UserProfile,
} from '01/_pages';
import { ESecuredIdentityRoleName } from 'myApi';
import { TasksRouter } from 'services/tasks/tasks.router';
import { ApartmentActs } from '01/features/actsJournal/displayActsJournal';
import { ObjectsProfileContainer } from 'services/objects/objectsProfileService';
import {
  ObjectProfileContainer,
  objectProfileService,
} from 'services/objects/objectProfileService';
import { DevicesPageContainer } from 'services/devices/devicesPageService';
import { ChangeODPUContainer } from 'services/devices/сhangeODPUService';
import { EditElectricNodeContainer } from 'services/devices/editElectricNodeService';
import { EditManagingFirmUserPage } from '01/features/staff/managingFirmUser/editManagingFirmUser';
import Devices from '01/_pages/ObjectProfile/components/Devices';
import EditODPU from '01/_pages/EditHousingMeteringDevice';
import { NodeArchivePageContainer } from '01/features/nodes/nodeArchiveService';
import { SettingsPageContainer } from '01/features/settings/SettingsPageContainer';
import { StatisticsPage } from '01/features/statistics';
import { ReportsPageContainer } from '01/features/reports';
import { Panel } from 'App/Panel';
import { ApartmentsRouteGroup } from '../routeGroups/ApartmentsRouteGroup';
import { CreateObjectContainer } from 'services/objects/createObjectService';

const { gates } = objectProfileService;

const { ObjectGroupIsOpen } = gates;

export const Router: FC<RouterProps> = ({ roles }) => {
  const redirectRoute = roles?.includes(ESecuredIdentityRoleName.Operator)
    ? '/meters/'
    : '/tasks/';
  return (
    <Wrapper>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" render={() => 'logout'} />
        <Route path="/error/" render={() => <ErrorPage />} />
        <Route path="/registration*" render={() => <Registration />} />
        <Route path="/access-denied/" render={() => <AccessDeniedPage />} />
        <Route path="/">
          <Layout>
            <Panel />
            <div />
            <PageWrapper>
              <Switch>
                <Redirect from="/" to={redirectRoute} exact />

                {TasksRouter()}

                <Route path="/actsJournal" exact>
                  <ApartmentActs />
                </Route>

                <Route
                  path="/objects/create"
                  component={CreateObjectContainer}
                  exact
                />
                  path="/objects/:housingStockId/add_node"
                  component={AddNode}
                  exact
                />

                <Route
                  path="/objects/:searchType?"
                  component={ObjectsProfileContainer}
                  exact
                />

                <Route path="/objects">
                  <ObjectGroupIsOpen />
                  <Route
                    path="/objects/profile/:housingStockId"
                    component={ObjectProfileContainer}
                    exact
                  />
                  <Route
                    path="/objects/:housingStockId/apartments/:apartmentId/:apartmentSection?"
                    component={ApartmentProfile}
                    exact
                  />
                </Route>

                <Route
                  path="/devices/:type?"
                  component={DevicesPageContainer}
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
                  path="/nodes/:nodeId/edit"
                  component={EditNode}
                  exact
                />

                <Route
                  path="/nodes/:nodeId/(stats|connection|readings|related|documents|checks)?"
                  component={NodeProfile}
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
                <Route
                  path="/adminSettings/:section"
                  component={SettingsPageContainer}
                  exact
                />

                <Redirect
                  from="/statistics/"
                  to="/statistics/subscribersConsumption/houses"
                  exact
                />
                <Redirect
                  from="/statistics/subscribersConsumption"
                  to="/statistics/subscribersConsumption/houses"
                  exact
                />

                <Route path="/statistics/:grouptype/:searchType?">
                  <StatisticsPage />
                </Route>

                <Route path="/reports" component={ReportsPageContainer} exact />
              </Switch>
              <ApartmentsRouteGroup />
            </PageWrapper>
          </Layout>
        </Route>
      </Switch>
    </Wrapper>
  );
};
