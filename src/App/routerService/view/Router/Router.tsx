import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout, PageWrapper, Wrapper } from './Router.styled';
import { RouterProps } from './Router.types';
import {
  AccessDeniedPage,
  ErrorPage,
  IndividualDevice,
  IndividualDeviceEdit,
  Login,
  Registration,
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
import { NodeArchivePageContainer } from '01/features/nodes/nodeArchiveService';
import { SettingsPageContainer } from '01/features/settings/SettingsPageContainer';
import { StatisticsPage } from '01/features/statistics';
import { Panel } from 'App/Panel';
import { ApartmentsRouteGroup } from '../routeGroups/ApartmentsRouteGroup';
import { EditNodeContainer } from 'services/devices/editNodeService';
import { CreateObjectContainer } from 'services/objects/createObjectService';
import { EditApartmentProfileContainer } from 'services/apartments/editApartmentProfileService';
import { EmployeeProfileContainer } from 'services/employeeProfileService';
import { ApartmentProfileContainer } from 'services/apartments/apartmentProfileService';
import { CreateNodeContainer } from 'services/nodes/createNodeService';
import { CalculatorProfileContainer } from 'services/calculators/calculatorProfileService';
import { HousingMeteringDeviceProfileContainer } from 'services/devices/housingMeteringDevices/housingMeteringDeviceProfileService';
import { EditHousingMeteringDeviceContainer } from 'services/devices/housingMeteringDevices/editHousingMeteringDeviceService';
import { NodeProfileContainer } from 'services/nodes/nodeProfileService';
import { MetersContainer } from 'services/meters/metersService';
import { CompanyProfileContainer } from 'services/company/companyProfileService';
import { EditEmployeeContainer } from 'services/employee/editEmployeeService';
import { ReportsContainer } from 'services/reportsService';
import { ReportViewContainer } from 'services/reportsService/reportViewService';
import { EditCalculatorContainer } from 'services/calculators/editCalculatorService';
import { ReportsPageContainer } from '01/features/reports';

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
                  <EditEmployeeContainer />
                </Route>

                <Route
                  path="/companyProfile/:section?"
                  component={CompanyProfileContainer}
                />

                <Route
                  path="/userProfile/:id"
                  component={EmployeeProfileContainer}
                />

                <Route
                  path={['/calculators/:deviceId']}
                  component={CalculatorProfileContainer}
                  exact
                />

                <Route
                  path="/calculators/:deviceId/edit"
                  component={EditCalculatorContainer}
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

                <Route
                  path="/meters/:section/:id?"
                  component={MetersContainer}
                />

                <Route
                  path="/nodeArchive/:nodeId"
                  component={NodeArchivePageContainer}
                  exact
                />

                <Route
                  path="/settings/:section/:id?"
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

                <Route
                  path="/reports/:reportType"
                  component={ReportViewContainer}
                  exact
                />

                <Redirect from="/meters" to="/meters/apartments" exact />
              </Switch>
              <ApartmentsRouteGroup />
            </PageWrapper>
          </Layout>
        </Route>
      </Switch>
    </Wrapper>
  );
};
