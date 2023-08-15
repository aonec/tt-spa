import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ESecuredIdentityRoleName } from 'api/types';
import { Panel } from 'App/Panel';
import { Layout, PageWrapper, Wrapper } from './Router.styled';
import { RouterProps } from './Router.types';
import { TasksRouter } from 'services/tasks/tasks.router';
import { ObjectsProfileContainer } from 'services/objects/objectsProfileService';
import { HousingStockProfileContainer } from 'services/objects/housingStockProfileService';
import { DevicesPageContainer } from 'services/devices/devicesPageService';
import { ChangeODPUContainer } from 'services/devices/сhangeODPUService';
import { EditElectricNodeContainer } from 'services/devices/editElectricNodeService';
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
import { ReportsPageContainer } from 'services/reports';
import { ReportsContainer } from 'services/reportsService';
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
import { DistrictBordersByAddressContainer } from 'services/settings/districtBordersService/districtBordersByAddressService';
import { StatisticsProfileContainer } from 'services/statistics/statisticsProfileService';
import { AddIndividualDeviceContainer } from 'services/devices/individualDevices/addIndividualDeviceService';
import { ResourceDisablingScheduleContainer } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleContainer';
import { WorkWithIndividualDeviceContainer } from 'services/devices/individualDevices/workWithIndividualDeviceService';
import { WorkWithIndividualDeviceType } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.types';
import { ManageDistrictsMapContainer } from 'services/settings/districtBordersService/manageDistrictsMapService';
import { CreateDistrictBorderMapContainer } from 'services/settings/districtBordersService/createDistrictBorderMapService';
import { NonResidentialBuildingProfileContainer } from 'services/objects/nonResidentialBuildingProfileService';
import { EditDistrictBordersContainer } from 'services/settings/districtBordersService/editDistrictBordersService';

export const Router: FC<RouterProps> = ({
  roles,
  isRolesLoadded,
  featureToggles,
}) => {
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
                      path="/buildings/create"
                      component={CreateObjectContainer}
                      exact
                    />
                  ) : (
                    <Route
                      path="/buildings/create"
                      component={AccessDeniedPage}
                      exact
                    />
                  )}
                  {isAdministrator ? (
                    <Route
                      path="/buildings/:houseCategory/:buildingId/edit"
                      component={EditObjectContainer}
                      exact
                    />
                  ) : (
                    <Redirect
                      from="/buildings/:buildingId/edit"
                      to="/access-denied/"
                      exact
                    />
                  )}

                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/buildings/:houseCategory/:buildingId/addNode"
                      component={CreateNodeContainer}
                      exact
                    />
                  ) : (
                    <Route
                      path="/buildings/:buildingId/addNode"
                      component={AccessDeniedPage}
                      exact
                    />
                  )}

                  {isAnyRole && (
                    <Route
                      path="/buildings/:searchType?"
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
                    <Route path="/buildings">
                      <Route
                        path={`/buildings/livingProfile/:buildingId`}
                        component={HousingStockProfileContainer}
                        exact
                      />
                      <Route
                        path={`/buildings/nonResidentialProfile/:buildingId`}
                        component={NonResidentialBuildingProfileContainer}
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

                  {(isSeniorOperator || isOperator) && (
                    <Route
                      path="/districtBordersSettings/editDistrictBorders/:id"
                      component={EditDistrictBordersContainer}
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
                      component={CreateDistrictBorderMapContainer}
                      exact
                    />
                  )}

                  {(isSeniorOperator || isAdministrator) && (
                    <Route
                      path="/districtBordersSettings/manageDistricts"
                      component={ManageDistrictsMapContainer}
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
                      path="/apartment/:id/individualDevice/:deviceId/switch"
                      exact
                    >
                      <WorkWithIndividualDeviceContainer
                        type={WorkWithIndividualDeviceType.switch}
                      />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/individualDevice/:deviceId/check"
                      exact
                    >
                      <WorkWithIndividualDeviceContainer
                        type={WorkWithIndividualDeviceType.check}
                      />
                    </Route>
                  )}
                  {(isSeniorOperator || isOperator) && (
                    <Route
                      path="/apartment/:id/individualDevice/:deviceId/reopen"
                      exact
                    >
                      <WorkWithIndividualDeviceContainer
                        type={WorkWithIndividualDeviceType.reopen}
                      />
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
