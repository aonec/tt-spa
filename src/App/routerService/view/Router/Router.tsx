import React, { FC } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ESecuredIdentityRoleName } from 'api/types';
import { Panel } from 'App/Panel';
import { Layout, PageWrapper } from './Router.styled';
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
import { menuService } from 'services/menuService/menuService.model';

const {
  gates: { CurrentUserGate },
} = menuService;

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

  const isSpectator = roles.includes(
    ESecuredIdentityRoleName.ManagingFirmSpectator,
  );

  const isSpectatingAdministrator = roles.includes(
    ESecuredIdentityRoleName.ManagingFirmSpectatingAdministrator,
  );

  const isRescrictedSpectator = roles.includes(
    ESecuredIdentityRoleName.ManagingFirmSpectatorRestricted,
  );

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

  function RouterWrapper() {
    return (
      <Layout>
        <Panel />
        <div />
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </Layout>
    );
  }

  return (
    <>
      <CurrentUserGate />
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/registration*" element={<RegistrationContainer />} />
        <Route path="/" element={<RouterWrapper />}>
          <Route path="/" element={<Navigate replace to={redirectRoute} />} />
          {/* {TasksRouter()} */}
          {/* {DistrictBordersRouter()} */}
          <Route
            path="/actsJournal"
            element={
              isSeniorOperator || isOperator ? (
                <ActsJournalContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/buildings/create"
            element={
              isAdministrator ? <CreateObjectContainer /> : <AccessDeniedPage />
            }
          />
          <Route
            path="/buildings/:houseCategory/:buildingId/edit"
            element={
              isAdministrator ? <EditObjectContainer /> : <AccessDeniedPage />
            }
          />
          {/* // <Redirect
                    //   from="/buildings/:buildingId/edit"
                    //   to="/access-denied/"
                    // />
                    // <Route
                    //   path="/buildings/:buildingId/edit"
                    //   element={<Navigate replace to="/access-denied/" />}
                    // /> */}
          <Route
            path="/buildings/:houseCategory/:buildingId/addNode"
            element={
              isAdministrator || isExecutor ? (
                <CreateNodeContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          //Протестить
          {/* <Route
                      path="/buildings/:buildingId/addNode"
                      element={<AccessDeniedPage />}
                    /> */}
          <Route
            path="/buildings/:searchType?"
            element={<ObjectsProfileContainer />}
          />
          <Route
            path="/apartments/:apartmentId/edit"
            element={
              isAdministrator || isSeniorOperator || isOperator ? (
                <EditApartmentProfileContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/apartments/:apartmentId/:tabSection?"
            element={<ApartmentProfileContainer />}
          />
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
          <Route
            path="/devices/addNode"
            element={
              isAdministrator || isExecutor ? (
                <CreateNodeContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route path="/devices/:type?" element={<DevicesPageContainer />} />
          <Route
            path="/changeODPU/:oldDeviceId"
            element={
              isAdministrator || isExecutor ? (
                <ChangeODPUContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/electricNode/:deviceId/edit"
            element={
              isAdministrator ||
              isSeniorOperator ||
              isOperator ||
              isExecutor ? (
                <EditElectricNodeContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/companyProfile/editManagingFirmUser/:id"
            element={
              isAdministrator ? <EditEmployeeContainer /> : <AccessDeniedPage />
            }
          />
          <Route
            path="/companyProfile/:section?"
            element={
              isAdministrator ? (
                <CompanyProfileContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/editCompany"
            element={
              isAdministrator ? <EditCompanyContainer /> : <AccessDeniedPage />
            }
          />
          <Route
            path="/userProfile/:id"
            element={
              isAdministrator ? (
                <EmployeeProfileContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/calculators/:deviceId/edit"
            element={
              isAdministrator || isExecutor ? (
                <EditCalculatorContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/calculators/:deviceId/profile/:section?"
            element={<CalculatorProfileContainer />}
          />
          <Route
            path="/nodes/:nodeId/edit"
            element={
              isAdministrator || isExecutor ? (
                <EditNodeContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/nodes/:nodeId/:section?"
            element={<NodeProfileContainer />}
          />
          <Route
            path="/housingMeteringDevices/:deviceId/edit"
            element={
              isAdministrator ||
              isExecutor ||
              isSeniorOperator ||
              isOperator ? (
                <EditHousingMeteringDeviceContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          //протестить
          <Route
            path="/housingMeteringDevices/:deviceId/profile/:section?"
            element={<HousingMeteringDeviceProfileContainer />}
          />
          <Route
            path="/individualDeviceProfile/:id"
            element={
              isSeniorOperator ||
              isExecutor ||
              isAdministrator ||
              isOperator ? (
                <IndividualMeteringDeviceProfileContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/individualDevices/:deviceId/edit"
            element={
              isAdministrator ||
              isSeniorOperator ||
              isExecutor ||
              isOperator ? (
                <EditIndividualDeviceContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route path="/meters/:section/:id?" element={<MetersContainer />} />
          <Route
            path="/services/:service/:section/:id?"
            element={<ServicesContainer />}
          />
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
          <Route
            path="/settings/:section?"
            element={
              isSeniorOperator || isOperator ? (
                <SettingsPageContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          //Протестить
          <Route
            path="/adminSettings/:section?"
            element={
              isAdministrator ? (
                <SettingsPageContainer isAdminSettings />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/adminSettings/operatingRanges/Standart"
            element={
              isAdministrator ? (
                <StandartWorkingRangeContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/adminSettings/operatingRanges/Group"
            element={
              isAdministrator ? (
                <GroupWorkingRangeContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/adminSettings/operatingRanges/Unique"
            element={
              isAdministrator ? (
                <UniqueWorkingRangeContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/statistics/"
            element={<Navigate replace to="/statistics/resourceConsumption" />}
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
          <Route
            path="/statistics/:grouptype/:searchType?"
            element={<StatisticsProfileContainer />}
          />
          <Route
            path="/reports"
            element={
              featureToggles.reportsConstructor ? (
                isSeniorOperator ? (
                  <ReportsContainer />
                ) : (
                  <AccessDeniedPage />
                )
              ) : isSeniorOperator ? (
                <ReportsPageContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/reports/:reportType"
            element={
              isSeniorOperator ? <ReportViewContainer /> : <AccessDeniedPage />
            }
          />
          <Route
            path="/apartment/:id/addIndividualDevice"
            element={
              isAdministrator || isSeniorOperator || isOperator ? (
                <AddIndividualDeviceContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/apartment/:id/individualDevice/:deviceId/switch"
            element={
              isAdministrator || isSeniorOperator || isOperator ? (
                <WorkWithIndividualDeviceContainer
                  type={WorkWithIndividualDeviceType.switch}
                />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/apartment/:id/individualDevice/:deviceId/check"
            element={
              isAdministrator || isSeniorOperator || isOperator ? (
                <WorkWithIndividualDeviceContainer
                  type={WorkWithIndividualDeviceType.check}
                />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/apartment/:id/individualDevice/:deviceId/reopen"
            element={
              isSeniorOperator || isOperator ? (
                <WorkWithIndividualDeviceContainer
                  type={WorkWithIndividualDeviceType.reopen}
                />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/apartment/:id/homeowners/add"
            element={
              isAdministrator || isSeniorOperator || isOperator ? (
                <AddPersonalNumberContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/apartment/:id/homeowners/:homeownerId/split"
            element={
              isAdministrator || isSeniorOperator || isOperator ? (
                <SplitPersonalNumberContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/apartment/:id/homeowners/:homeownerId/edit"
            element={
              isAdministrator || isSeniorOperator || isOperator ? (
                <EditPersonalNumberContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/apartment/:id/homeowners/:homeownerId/switch"
            element={
              isAdministrator || isSeniorOperator || isOperator ? (
                <SwitchPersonalNumberContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route
            path="/disabledResources"
            element={
              isDispatcher ? (
                <ResourceDisablingScheduleContainer />
              ) : (
                <AccessDeniedPage />
              )
            }
          />
          <Route path="/access-denied/" element={<AccessDeniedPage />} />
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
        </Route>
      </Routes>
    </>
  );
};
