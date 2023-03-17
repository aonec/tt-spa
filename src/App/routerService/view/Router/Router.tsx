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
import { ReportViewContainer } from 'services/reportsService/reportViewService';
import { EditCalculatorContainer } from 'services/calculators/editCalculatorService';
import { StandartWorkingRangeContainer } from '01/features/settings/standartWorkingRangeService';
import { GroupWorkingRangeContainer } from '01/features/settings/groupWorkingRangeService';
import { UniqueWorkingRangeContainer } from '01/features/settings/uniqueWorkingRangeService';
import { EditCompanyContainer } from 'services/company/editCompanyService';
import { ReportsPageContainer } from '01/features/reports';
import { AddPersonalNumberPage } from '01/features/homeowner/addPersonalNumber';
import { EditHomeownerPersonalNumberPage } from '01/features/homeowner/editPersonalNumber';
import { SplitPersonalNumber } from '01/features/homeowner/splitPersonalNumber';
import { SwitchPersonalNumberPage } from '01/features/homeowner/switchPersonalNumber';
import { AddIndividualDevice } from '01/features/individualDevices/addIndividualDevice';
import { SwitchIndividualDevice } from '01/features/individualDevices/switchIndividualDevice';
import { ReadingHistoryPage } from '01/features/readings/displayReadingHistory';

const { gates } = objectProfileService;

const { ObjectGroupIsOpen } = gates;

export const Router: FC<RouterProps> = ({ roles, isRolesLoadded }) => {
  const redirectRoute = roles.length
    ? roles?.includes(
        ESecuredIdentityRoleName.SeniorOperator ||
          ESecuredIdentityRoleName.Operator,
      )
      ? '/meters/apartments'
      : '/tasks/'
    : '/login';

  const isAdministrator = roles.includes(
    ESecuredIdentityRoleName.Administrator,
  );
  const isSeniorOperator = roles.includes(
    ESecuredIdentityRoleName.SeniorOperator,
  );
  const isOperator = roles.includes(ESecuredIdentityRoleName.Operator);

  const isDispatcher = roles.includes(
    ESecuredIdentityRoleName.ManagingFirmDispatcher,
  );
  const isExecutor = roles.includes(
    ESecuredIdentityRoleName.ManagingFirmExecutor,
  );
  const isController = roles.includes(ESecuredIdentityRoleName.Controller);

  const isSpectator = roles.includes(
    ESecuredIdentityRoleName.ManagingFirmSpectator,
  );
  const isSpectatorRestricted = roles.includes(
    ESecuredIdentityRoleName.ManagingFirmSpectator,
  );
  const isAnyRole =
    isAdministrator ||
    isSeniorOperator ||
    isOperator ||
    isExecutor ||
    isController ||
    isDispatcher ||
    isSpectator ||
    isSpectatorRestricted;

  return (
    <Wrapper>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" render={() => 'logout'} />
        <Route path="/error/" render={() => <ErrorPage />} />
        <Route path="/registration*" render={() => <Registration />} />
        <Route path="/">
          <Layout>
            <Panel />
            <div />
            <PageWrapper>
              {!isRolesLoadded && Boolean(roles.length) && (
                <Switch>
                  <Redirect from="/" to={redirectRoute} exact />

                  {TasksRouter()}

                  {(isSeniorOperator || isOperator) && (
                    <Route path="/actsJournal" exact>
                      <ApartmentActs />
                    </Route>
                  )}

                  {isAdministrator ? (
                    <Route
                      path="/objects/create"
                      component={CreateObjectContainer}
                      exact
                    />
                  ) : (
                    <Redirect
                      from="/objects/create"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/objects/:housingStockId/addNode"
                      component={CreateNodeContainer}
                      exact
                    />
                  ) : (
                    <Redirect
                      from="/objects/:housingStockId/addNode"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAnyRole && (
                    <Route
                      path="/objects/:searchType?"
                      component={ObjectsProfileContainer}
                      exact
                    />
                  )}

                  {isAdministrator || isSeniorOperator || isOperator ? (
                    <Route
                      path="/apartments/:apartmentId/edit"
                      component={EditApartmentProfileContainer}
                      exact
                    />
                  ) : (
                    <Redirect
                      from="/apartments/:apartmentId/edit"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAnyRole && (
                    <Route
                      path="/apartments/:apartmentId/:tabSection?"
                      component={ApartmentProfileContainer}
                      exact
                    />
                  )}

                  {isAnyRole && (
                    <Route path="/objects">
                      <ObjectGroupIsOpen />
                      <Route
                        path="/objects/profile/:housingStockId"
                        component={ObjectProfileContainer}
                        exact
                      />
                    </Route>
                  )}

                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/devices/addNode"
                      component={CreateNodeContainer}
                      exact
                    />
                  ) : (
                    <Redirect
                      from="/devices/addNode"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAnyRole && (
                    <Route
                      path="/devices/:type?"
                      component={DevicesPageContainer}
                      exact
                    />
                  )}

                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/changeODPU/:oldDeviceId"
                      component={ChangeODPUContainer}
                      exact
                    />
                  ) : (
                    <Redirect
                      from="/changeODPU/:oldDeviceId"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAdministrator ||
                  isSeniorOperator ||
                  isOperator ||
                  isExecutor ? (
                    <Route
                      path="/electricNode/:deviceId/edit"
                      component={EditElectricNodeContainer}
                    />
                  ) : (
                    <Redirect
                      from="/electricNode/:deviceId/edit"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAdministrator && (
                    <Route
                      path="/companyProfile/editManagingFirmUser/:id"
                      exact
                    >
                      <EditEmployeeContainer />
                    </Route>
                  )}

                  {isAdministrator && (
                    <Route
                      path="/companyProfile/:section?"
                      component={CompanyProfileContainer}
                    />
                  )}

                  {isAdministrator && (
                    <Route
                      path="/editCompany"
                      component={EditCompanyContainer}
                    />
                  )}

                  {isAdministrator && (
                    <Route
                      path="/userProfile/:id"
                      component={EmployeeProfileContainer}
                    />
                  )}

                  {isAnyRole && (
                    <Route
                      path={['/calculators/:deviceId']}
                      component={CalculatorProfileContainer}
                      exact
                    />
                  )}

                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/calculators/:deviceId/edit"
                      component={EditCalculatorContainer}
                      exact
                    />
                  ) : (
                    <Redirect
                      from="/calculators/:deviceId/edit"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/nodes/:nodeId/edit"
                      component={EditNodeContainer}
                      exact
                    />
                  ) : (
                    <Redirect
                      from="/nodes/:nodeId/edit"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAnyRole && (
                    <Route
                      path="/nodes/:nodeId/:section?"
                      component={NodeProfileContainer}
                      exact
                    />
                  )}

                  {isAnyRole && (
                    <Route
                      path={['/housingMeteringDevices/:deviceId/']}
                      component={HousingMeteringDeviceProfileContainer}
                      exact
                    />
                  )}

                  {isAdministrator ||
                  isExecutor ||
                  isSeniorOperator ||
                  isOperator ? (
                    <Route
                      path="/housingMeteringDevices/:deviceId/edit"
                      component={EditHousingMeteringDeviceContainer}
                      exact
                    />
                  ) : (
                    <Redirect
                      from="/housingMeteringDevices/:deviceId/edit"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAnyRole && (
                    <Route
                      path="/individualDevices/:deviceId"
                      component={IndividualDevice}
                      exact
                    />
                  )}

                  {isAdministrator || isSeniorOperator || isExecutor ? (
                    <Route
                      path="/individualDevices/:deviceId/edit"
                      component={IndividualDeviceEdit}
                      exact
                    />
                  ) : (
                    <Redirect
                      from="/individualDevices/:deviceId/edit"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAnyRole && (
                    <Route
                      path="/meters/:section/:id?"
                      component={MetersContainer}
                    />
                  )}

                  {isAnyRole && (
                    <Route
                      path="/nodeArchive/:nodeId"
                      component={NodeArchivePageContainer}
                      exact
                    />
                  )}

                  {(isSeniorOperator || isOperator) && (
                    <Route
                      path="/settings/:section/:id?"
                      component={SettingsPageContainer}
                      exact
                    />
                  )}

                  {isAdministrator && (
                    <Route
                      path="/adminSettings/:section"
                      component={SettingsPageContainer}
                      exact
                    />
                  )}

                  {isAdministrator && (
                    <Route
                      path="/adminSettings/operatingRanges/Standart"
                      component={StandartWorkingRangeContainer}
                      exact
                    />
                  )}
                  {isAdministrator && (
                    <Route
                      path="/adminSettings/operatingRanges/Group"
                      component={GroupWorkingRangeContainer}
                      exact
                    />
                  )}
                  {isAdministrator && (
                    <Route
                      path="/adminSettings/operatingRanges/Unique"
                      component={UniqueWorkingRangeContainer}
                      exact
                    />
                  )}

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
                  {isAnyRole && (
                    <Route path="/statistics/:grouptype/:searchType?">
                      <StatisticsPage />
                    </Route>
                  )}

                  {isSeniorOperator && (
                    <Route
                      path="/reports"
                      component={ReportsPageContainer}
                      exact
                    />
                  )}
                  {isSeniorOperator && (
                    <Route
                      path="/reports/:reportType"
                      component={ReportViewContainer}
                      exact
                    />
                  )}

                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route path="/apartment/:id/addIndividualDevice" exact>
                      <AddIndividualDevice />
                    </Route>
                  )}

                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/individualDevice/:deviceId/readingHistory"
                      exact
                    >
                      <ReadingHistoryPage />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/houses/individualDevice/:deviceId/readingHistory"
                      exact
                    >
                      <ReadingHistoryPage />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/individualDevice/:deviceId/switch"
                      exact
                    >
                      <SwitchIndividualDevice type="switch" />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/individualDevice/:deviceId/check"
                      exact
                    >
                      <SwitchIndividualDevice type="check" />
                    </Route>
                  )}
                  {(isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/individualDevice/:deviceId/reopen"
                      exact
                    >
                      <SwitchIndividualDevice type="reopen" />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/homeowners/addPersonalNumber"
                      exact
                    >
                      <AddPersonalNumberPage />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/homeowners/:homeownerId/splitApartment"
                      exact
                    >
                      <SplitPersonalNumber />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/homeowners/:homeownerId/editPersonalNumber"
                      exact
                    >
                      <EditHomeownerPersonalNumberPage />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/homeowners/:homeownerId/switchPersonalNumberFx"
                      exact
                    >
                      <SwitchPersonalNumberPage />
                    </Route>
                  )}

                  <Redirect from="/meters" to="/meters/apartments" exact />
                  <Redirect from="*" to="/access-denied/" exact />
                  <Route path="/access-denied/" component={AccessDeniedPage} />
                </Switch>
              )}
            </PageWrapper>
          </Layout>
        </Route>
      </Switch>
    </Wrapper>
  );
};
