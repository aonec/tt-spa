import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import { StatisticsProfileContainer } from 'services/statistics/statisticsProfileService';
import { AddIndividualDeviceContainer } from 'services/devices/individualDevices/addIndividualDeviceService';
import { ResourceDisablingScheduleContainer } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleContainer';
import { WorkWithIndividualDeviceContainer } from 'services/devices/individualDevices/workWithIndividualDeviceService';
import { WorkWithIndividualDeviceType } from 'services/devices/individualDevices/workWithIndividualDeviceService/workWithIndividualDeviceService.types';
import { NonResidentialBuildingProfileContainer } from 'services/objects/nonResidentialBuildingProfileService';
import { IndividualMeteringDeviceProfileContainer } from 'services/devices/individualMeteringDeviceProfile';
import { DistrictBordersRouter } from 'services/settings/districtBordersService/DistrictBorders.router';

export const Router: FC<RouterProps> = ({
  roles,
  isRolesLoadded,
  featureToggles,
}) => {
  const isAdministrator =
    roles.includes(ESecuredIdentityRoleName.Administrator) ||
    roles.includes(
      ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
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

  const isSpectatingAdministrator = roles.includes(
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  );

  const isRescrictedSpectator = roles.includes(
    ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
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

  const redirectRoute = (() => {
    if (!roles.length) return '/login';

    const defaultPath = '/tasks/';

    return isSeniorOperator || isOperator ? '/meters/apartments' : defaultPath;
  })();

  const isShowNodeArchivePage =
    isAdministrator ||
    isExecutor ||
    isSpectator ||
    isSpectatingAdministrator ||
    isRescrictedSpectator;

  return (
    <Wrapper>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/registration*" element={<RegistrationContainer />} />
        <Route path="/">
          <Layout>
            <Panel />
            <div />
            <PageWrapper>
              {!isRolesLoadded && Boolean(roles.length) && (
                <Routes>
                  //Протестить
                  <Route
                    path="/"
                    element={<Navigate replace to={redirectRoute} />}
                  />
                  {TasksRouter()}
                  {DistrictBordersRouter()}
                  {(isSeniorOperator || isOperator) && (
                    <Route path="/actsJournal">
                      <ActsJournalContainer />
                    </Route>
                  )}
                  {isAdministrator ? (
                    <Route
                      path="/buildings/create"
                      element={<CreateObjectContainer />}
                    />
                  ) : (
                    <Route
                      path="/buildings/create"
                      element={<AccessDeniedPage />}
                    />
                  )}
                  {isAdministrator ? (
                    <Route
                      path="/buildings/:houseCategory/:buildingId/edit"
                      element={<EditObjectContainer />}
                    />
                  ) : (
                    // <Redirect
                    //   from="/buildings/:buildingId/edit"
                    //   to="/access-denied/"
                    // />
                    <Route
                      path="/buildings/:buildingId/edit"
                      element={<Navigate replace to="/access-denied/" />}
                    />
                  )}
                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/buildings/:houseCategory/:buildingId/addNode"
                      element={<CreateNodeContainer />}
                    />
                  ) : (
                    <Route
                      path="/buildings/:buildingId/addNode"
                      element={<AccessDeniedPage />}
                    />
                  )}
                  {isAnyRole && (
                    <Route
                      path="/buildings/:searchType?"
                      element={<ObjectsProfileContainer />}
                    />
                  )}
                  {isAdministrator || isSeniorOperator || isOperator ? (
                    <Route
                      path="/apartments/:apartmentId/edit"
                      element={<EditApartmentProfileContainer />}
                    />
                  ) : (
                    <Route
                      path="/apartments/:apartmentId/edit"
                      element={<AccessDeniedPage />}
                    />
                  )}
                  {isAnyRole && (
                    <Route
                      path="/apartments/:apartmentId/:tabSection?"
                      element={<ApartmentProfileContainer />}
                    />
                  )}
                  {isAnyRole && (
                    <Route path="/buildings">
                      <Route
                        path={`/buildings/livingProfile/:buildingId/:section?`}
                        element={<HousingStockProfileContainer />}
                      />
                      <Route
                        path={`/buildings/nonResidentialProfile/:buildingId/:section?`}
                        element={<NonResidentialBuildingProfileContainer />}
                      />
                    </Route>
                  )}
                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/devices/addNode"
                      element={<CreateNodeContainer />}
                    />
                  ) : (
                    <Route
                      path="/devices/addNode"
                      element={<AccessDeniedPage />}
                    />
                  )}
                  {isAnyRole && (
                    <Route
                      path="/devices/:type?"
                      element={<DevicesPageContainer />}
                    />
                  )}
                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/changeODPU/:oldDeviceId"
                      element={<ChangeODPUContainer />}
                    />
                  ) : (
                    <Route
                      path="/changeODPU/:oldDeviceId"
                      element={<AccessDeniedPage />}
                    />
                  )}
                  {isAdministrator ||
                  isSeniorOperator ||
                  isOperator ||
                  isExecutor ? (
                    <Route
                      path="/electricNode/:deviceId/edit"
                      element={<EditElectricNodeContainer />}
                    />
                  ) : (
                    <Route
                      path="/electricNode/:deviceId/edit"
                      element={<AccessDeniedPage />}
                    />
                  )}
                  {isAdministrator && (
                    <Route path="/companyProfile/editManagingFirmUser/:id">
                      <EditEmployeeContainer />
                    </Route>
                  )}
                  {isAdministrator && (
                    <Route
                      path="/companyProfile/:section?"
                      element={<CompanyProfileContainer />}
                    />
                  )}
                  {isAdministrator && (
                    <Route
                      path="/editCompany"
                      element={<EditCompanyContainer />}
                    />
                  )}
                  {isAdministrator && (
                    <Route
                      path="/userProfile/:id"
                      element={<EmployeeProfileContainer />}
                    />
                  )}
                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/calculators/:deviceId/edit"
                      element={<EditCalculatorContainer />}
                    />
                  ) : (
                    <Route
                      path="/calculators/:deviceId/edit"
                      element={<AccessDeniedPage />}
                    />
                  )}
                  {isAnyRole && (
                    <Route
                      path="/calculators/:deviceId/profile/:section?"
                      element={<CalculatorProfileContainer />}
                    />
                  )}
                  {isAdministrator || isExecutor ? (
                    <Route
                      path="/nodes/:nodeId/edit"
                      element={<EditNodeContainer />}
                    />
                  ) : (
                    <Route
                      path="/nodes/:nodeId/edit"
                      element={<AccessDeniedPage />}
                    />
                  )}
                  {isAnyRole && (
                    <Route
                      path="/nodes/:nodeId/:section?"
                      element={<NodeProfileContainer />}
                    />
                  )}
                  {isAdministrator ||
                  isExecutor ||
                  isSeniorOperator ||
                  isOperator ? (
                    <Route
                      path="/housingMeteringDevices/:deviceId/edit"
                      element={<EditHousingMeteringDeviceContainer />}
                    />
                  ) : (
                    <Route
                      path="/housingMeteringDevices/:deviceId/edit"
                      element={<AccessDeniedPage />}
                    />
                  )}
                  //протестить
                  {isAnyRole && (
                    <Route
                      path="/housingMeteringDevices/:deviceId/profile/:section?"
                      element={<HousingMeteringDeviceProfileContainer />}
                    />
                  )}
                  {(isSeniorOperator ||
                    isExecutor ||
                    isAdministrator ||
                    isOperator) && (
                    <Route
                      path="/individualDeviceProfile/:id"
                      element={<IndividualMeteringDeviceProfileContainer />}
                    />
                  )}
                  {isAdministrator ||
                  isSeniorOperator ||
                  isExecutor ||
                  isOperator ? (
                    <Route
                      path="/individualDevices/:deviceId/edit"
                      element={<EditIndividualDeviceContainer />}
                    />
                  ) : (
                    <Route
                      path="/individualDevices/:deviceId/edit"
                      element={<AccessDeniedPage />}
                    />
                  )}
                  {isAnyRole && (
                    <Route
                      path="/meters/:section/:id?"
                      element={<MetersContainer />}
                    />
                  )}
                  {isAnyRole && (
                    <Route
                      path="/services/:service/:section/:id?"
                      element={<ServicesContainer />}
                    />
                  )}
                  <Route
                    path="/nodeArchive/:nodeId"
                    element={
                      isShowNodeArchivePage ? (
                        <NodeArchivePageContainer />
                      ) : (
                        <AccessDeniedPage />
                      )
                    }
                  />
                  {(isSeniorOperator || isOperator) && (
                    <Route
                      path="/settings/:section?"
                      element={<SettingsPageContainer />}
                    />
                  )}
                  //Протестить
                  {isAdministrator && (
                    <Route
                      path="/adminSettings/:section?"
                      element={<SettingsPageContainer isAdminSettings />}
                    />
                  )}
                  {isAdministrator && (
                    <Route
                      path="/adminSettings/operatingRanges/Standart"
                      element={<StandartWorkingRangeContainer />}
                    />
                  )}
                  {isAdministrator && (
                    <Route
                      path="/adminSettings/operatingRanges/Group"
                      element={<GroupWorkingRangeContainer />}
                    />
                  )}
                  {isAdministrator && (
                    <Route
                      path="/adminSettings/operatingRanges/Unique"
                      element={<UniqueWorkingRangeContainer />}
                    />
                  )}
                  <Route
                    path="/statistics/"
                    element={
                      <Navigate replace to="/statistics/resourceConsumption" />
                    }
                  />
                  <Route
                    path="/statistics/subscribersConsumption"
                    element={
                      <Navigate
                        replace
                        to="/statistics/subscribersConsumption/houses"
                      />
                    }
                  />
                  {isAnyRole && (
                    <Route path="/statistics/:grouptype/:searchType?">
                      <StatisticsProfileContainer />
                    </Route>
                  )}
                  {isSeniorOperator && (
                    <Route
                      path="/reports"
                      element={
                        featureToggles.reportsConstructor ? (
                          <ReportsContainer />
                        ) : (
                          <ReportsPageContainer />
                        )
                      }
                    />
                  )}
                  {isSeniorOperator && (
                    <Route
                      path="/reports/:reportType"
                      element={<ReportViewContainer />}
                    />
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route path="/apartment/:id/addIndividualDevice">
                      <AddIndividualDeviceContainer />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route path="/apartment/:id/individualDevice/:deviceId/switch">
                      <WorkWithIndividualDeviceContainer
                        type={WorkWithIndividualDeviceType.switch}
                      />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route path="/apartment/:id/individualDevice/:deviceId/check">
                      <WorkWithIndividualDeviceContainer
                        type={WorkWithIndividualDeviceType.check}
                      />
                    </Route>
                  )}
                  {(isSeniorOperator || isOperator) && (
                    <Route path="/apartment/:id/individualDevice/:deviceId/reopen">
                      <WorkWithIndividualDeviceContainer
                        type={WorkWithIndividualDeviceType.reopen}
                      />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route path="/apartment/:id/homeowners/add">
                      <AddPersonalNumberContainer />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route path="/apartment/:id/homeowners/:homeownerId/split">
                      <SplitPersonalNumberContainer />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route path="/apartment/:id/homeowners/:homeownerId/edit">
                      <EditPersonalNumberContainer />
                    </Route>
                  )}
                  {(isAdministrator || isSeniorOperator || isOperator) && (
                    <Route path="/apartment/:id/homeowners/:homeownerId/switch">
                      <SwitchPersonalNumberContainer />
                    </Route>
                  )}
                  {isDispatcher && (
                    <Route path="/disabledResources">
                      <ResourceDisablingScheduleContainer />
                    </Route>
                  )}
                  <Route path="/access-denied/">
                    <AccessDeniedPage />
                  </Route>
                  <Route
                    path="/services"
                    element={<Navigate replace to="/services/seal" />}
                  />
                  <Route
                    path="/services/seal"
                    element={<Navigate replace to="/services/seal/select" />}
                  />
                  <Route
                    path="/meters"
                    element={<Navigate replace to="/meters/apartments" />}
                  />
                  <Route path="*" element={<AccessDeniedPage />} />
                </Routes>
              )}
            </PageWrapper>
          </Layout>
        </Route>
      </Routes>
    </Wrapper>
  );
};
