import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout, PageWrapper, Wrapper } from './Router.styled';
import { RouterProps } from './Router.types';
import {
  AccessDeniedPage,
  CalculatorProfile,
  Contractor,
  EditCalculator,
  ErrorPage,
  HousingProfile,
  IndividualDevice,
  IndividualDeviceEdit,
  Login,
  MetersPage,
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
import { EditNodeContainer } from 'services/devices/editNodeService';
import { CreateObjectContainer } from 'services/objects/createObjectService';
import { EditApartmentProfileContainer } from 'services/apartments/editApartmentProfileService';
import { EmployeeProfileContainer } from 'services/employeeProfileService';
import { ApartmentProfileContainer } from 'services/apartments/apartmentProfileService';
import { CreateNodeContainer } from 'services/nodes/createNodeService';
import { HousingMeteringDeviceProfileContainer } from 'services/devices/housingMeteringDevices/housingMeteringDeviceProfileService';
import { EditHousingMeteringDeviceContainer } from 'services/devices/housingMeteringDevices/editHousingMeteringDeviceService';
import { NodeProfileContainer } from 'services/nodes/nodeProfileService';

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

                <Route
                  path="/objects/:housingStockId/addNode"
                  component={CreateNodeContainer}
                  exact
                />

                <Route
                  path="/objects/:searchType?"
                  component={ObjectsProfileContainer}
                  exact
                />

                <Route
                  path="/apartments/:apartmentId/edit"
                  component={EditApartmentProfileContainer}
                  exact
                />

                <Route
                  path="/apartments/:apartmentId/:tabSection?"
                  component={ApartmentProfileContainer}
                  exact
                />

                <Route path="/objects">
                  <ObjectGroupIsOpen />
                  <Route
                    path="/objects/profile/:housingStockId"
                    component={ObjectProfileContainer}
                    exact
                  />
                </Route>

                <Route
                  path="/devices/addNode"
                  component={CreateNodeContainer}
                  exact
                />

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

                <Route path="/companyProfile/editManagingFirmUser/:id" exact>
                  <EditManagingFirmUserPage />
                </Route>
                <Route path="/companyProfile/:section?" component={Settings} />
                <Route path="/companyProfile/staff/:id" component={Settings} />

                <Route
                  path="/userProfile/:id"
                  component={EmployeeProfileContainer}
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
                  path="/nodes/:nodeId/edit"
                  component={EditNodeContainer}
                  exact
                />

                <Route
                  path="/nodes/:nodeId/:section?"
                  component={NodeProfileContainer}
                  exact
                />

                <Route
                  path={['/housingMeteringDevices/:deviceId/']}
                  component={HousingMeteringDeviceProfileContainer} 
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
                  path="/housingMeteringDevices/:deviceId/edit"
                  component={EditHousingMeteringDeviceContainer}
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
