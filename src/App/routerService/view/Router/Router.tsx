import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout, PageWrapper, Wrapper } from './Router.styled';
import { RouterProps } from './Router.types';
import { ESecuredIdentityRoleName } from 'myApi';
import { TasksRouter } from 'services/tasks/tasks.router';
import { ObjectsProfileContainer } from 'services/objects/objectsProfileService';
import {
  ObjectProfileContainer,
  objectProfileService,
} from 'services/objects/objectProfileService';
import { DevicesPageContainer } from 'services/devices/devicesPageService';
import { ChangeODPUContainer } from 'services/devices/сhangeODPUService';
import { EditElectricNodeContainer } from 'services/devices/editElectricNodeService';
import { Panel } from 'App/Panel';
import { CreateObjectContainer } from 'services/objects/createObjectService';
import { EditApartmentProfileContainer } from 'services/apartments/editApartmentProfileService';
import { EmployeeProfileContainer } from 'services/employee/employeeProfileService';
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
import { StandartWorkingRangeContainer } from 'services/workingRanges/standartWorkingRangeService';
import { GroupWorkingRangeContainer } from 'services/workingRanges/groupWorkingRangeService';
import { UniqueWorkingRangeContainer } from 'services/workingRanges/uniqueWorkingRangeService';
import { EditCompanyContainer } from 'services/company/editCompanyService';
import { ReportsPageContainer } from '01/features/reports';
import { featureToggles } from 'featureToggles';
import { ReportsContainer } from 'services/reportsService';
import { SwitchIndividualDevice } from '01/features/individualDevices/switchIndividualDevice';
import { ReadingHistoryPage } from '01/features/readings/displayReadingHistory';
import { AccessDeniedPage } from 'services/authorizations/AccessDeniedPage';
import { EditObjectContainer } from 'services/objects/editObjectService';
import { EditIndividualDeviceContainer } from 'services/meters/editIndividualDeviceService';
import { LoginContainer } from 'services/authorizations/loginService';
import { RegistrationContainer } from 'services/authorizations/registrationService';
import { AddPersonalNumberContainer } from 'services/homeowner/personalNumber/addPersonalNumberService';
import { EditPersonalNumberContainer } from 'services/homeowner/personalNumber/editPersonalNumberService';
import { SwitchPersonalNumberContainer } from 'services/homeowner/personalNumber/switchPersonalNumberService';
import { SplitPersonalNumberContainer } from 'services/homeowner/personalNumber/splitPersonalNumberService';
import { SettingsPageContainer } from 'services/settings/settingsPageService';
import { ActsJournalContainer } from 'services/actsJournalService';
import { ServicesContainer } from 'services/services/servicesService';
import { NodeArchivePageContainer } from 'services/nodes/nodeArchiveService';
import { EditNodeContainer } from 'services/nodes/editNodeService';
import { CreateDistrictBorderByMapContainer } from 'services/settings/districtBordersService/CreateDistrictBorderByMapService';
import { DistrictBordersByAddressContainer } from 'services/settings/districtBordersService/districtBordersByAddressService';
import { StatisticsProfileContainer } from 'services/statistics/statisticsProfileService';
import { AddIndividualDeviceContainer } from 'services/devices/individualDevices/addIndividualDeviceService';
import { ResourceDisablingScheduleContainer } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleContainer';

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
        <Route path="/login" component={LoginContainer} />
        <Route path="/registration*" component={RegistrationContainer} />
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
                      <ActsJournalContainer />
                    </Route>
                  )}

                  {isAdministrator ? (
                    <Route
                      path="/objects/create"
                      component={CreateObjectContainer}
                      exact
                    />
                  ) : (
                    <Route
                      path="/objects/create"
                      component={AccessDeniedPage}
                      exact
                    />
                  )}
                  {isAdministrator ? (
                    <Route
                      path="/objects/:buildingId/edit"
                      component={EditObjectContainer}
                      exact
                    />
                  ) : (
                    <Redirect
                      from="/objects/:buildingId/edit"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/objects/:buildingId/addNode"
                      component={CreateNodeContainer}
                      exact
                    />
                  ) : (
                    <Route
                      path="/objects/:buildingId/addNode"
                      component={AccessDeniedPage}
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
                    <Route
                      path="/apartments/:apartmentId/edit"
                      component={AccessDeniedPage}
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
                        path="/objects/profile/:buildingId"
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
                    <Route
                      path="/devices/addNode"
                      component={AccessDeniedPage}
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
                    <Route
                      path="/changeODPU/:oldDeviceId"
                      component={AccessDeniedPage}
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
                    <Route
                      path="/electricNode/:deviceId/edit"
                      component={AccessDeniedPage}
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
                    <Route
                      path="/calculators/:deviceId/edit"
                      component={AccessDeniedPage}
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
                    <Route
                      path="/nodes/:nodeId/edit"
                      component={AccessDeniedPage}
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
                    <Route
                      path="/housingMeteringDevices/:deviceId/edit"
                      component={AccessDeniedPage}
                      exact
                    />
                  )}

                  {isAdministrator ||
                  isSeniorOperator ||
                  isExecutor ||
                  isOperator ? (
                    <Route
                      path="/individualDevices/:deviceId/edit"
                      component={EditIndividualDeviceContainer}
                      exact
                    />
                  ) : (
                    <Route
                      path="/individualDevices/:deviceId/edit"
                      component={AccessDeniedPage}
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
                      path="/services/:service/:section/:id?"
                      component={ServicesContainer}
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
                      path="/settings/:section"
                      component={SettingsPageContainer}
                      exact
                    />
                  )}

                  {(isSeniorOperator || isOperator) && (
                    <Route
                      path="/districtBordersSettings/createByHousingStocksList"
                      component={DistrictBordersByAddressContainer}
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

                  {(isSeniorOperator || isAdministrator) && (
                    <Route
                      path="/districtBordersSettings/createByMap"
                      component={CreateDistrictBorderByMapContainer}
                      exact
                    />
                  )}

                  <Redirect
                    from="/statistics/"
                    to="/statistics/resourceConsumption"
                    exact
                  />

                  <Redirect
                    from="/statistics/subscribersConsumption"
                    to="/statistics/subscribersConsumption/houses"
                    exact
                  />
                  {isAnyRole && (
                    <Route path="/statistics/:grouptype/:searchType?">
                      <StatisticsProfileContainer />
                    </Route>
                  )}

                  {isSeniorOperator && (
                    <Route
                      path="/reports"
                      component={
                        featureToggles.reportsConstructor
                          ? ReportsContainer
                          : ReportsPageContainer
                      }
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
                      <AddIndividualDeviceContainer />
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
                    <Route path="/apartment/:id/homeowners/add" exact>
                      <AddPersonalNumberContainer />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/homeowners/:homeownerId/split"
                      exact
                    >
                      <SplitPersonalNumberContainer />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/homeowners/:homeownerId/edit"
                      exact
                    >
                      <EditPersonalNumberContainer />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/homeowners/:homeownerId/switch"
                      exact
                    >
                      <SwitchPersonalNumberContainer />
                    </Route>
                  )}
                  {isDispatcher && (
                    <Route path="/disabledResources" exact>
                      <ResourceDisablingScheduleContainer />
                    </Route>
                  )}

                  <Route path="/access-denied/">
                    <AccessDeniedPage />
                  </Route>
                  <Redirect from="/services" to="/services/seal" exact />
                  <Redirect
                    from="/services/seal"
                    to="/services/seal/select"
                    exact
                  />

                  <Redirect from="/meters" to="/meters/apartments" exact />
                  <Route path="*" component={AccessDeniedPage} exact />
                </Switch>
              )}
            </PageWrapper>
          </Layout>
        </Route>
      </Switch>
    </Wrapper>
  );
};
