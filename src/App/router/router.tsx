import { Navigate, Outlet } from 'react-router-dom';
import React, { useMemo } from 'react';
import { Layout, PageWrapper } from './Router.styled';
import { Panel } from 'App/Panel';
import {
  ESecuredIdentityRoleName,
  ESecuredIdentityRoleNameStringDictionaryItem,
  TaskGroupingFilter,
} from 'api/types';
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
import { currentUserService } from 'services/currentUserService';
import { ObjectsProfileContainer } from 'services/objects/objectsProfileService';
import { ReportsPageContainer } from 'services/reports';
import { ReportsContainer } from 'services/reportsService';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';
import {
  DistrictBordersByAddressContainer,
  districtBordersByAddressService,
} from 'services/settings/districtBordersService/districtBordersByAddressService';
import { EditDistrictBordersContainer } from 'services/settings/districtBordersService/editDistrictBordersService';
import { CreateDistrictBorderMapContainer } from 'services/settings/districtBordersService/createDistrictBorderMapService';
import { ManageDistrictsMapContainer } from 'services/settings/districtBordersService/manageDistrictsMapService';
import { TaskProfileContainer } from 'services/tasks/taskProfileService';
import {
  TasksProfileContainer,
  tasksProfileService,
} from 'services/tasks/tasksProfileService';
import { currentOrganizationService } from 'services/currentOrganizationService';
import { useUnit } from 'effector-react';
import { tokensService } from 'api/tokensService';

const {
  gates: { CurrentUserGate },
} = currentUserService;
const {
  gates: { CurrentManagingFirmGate },
} = currentOrganizationService;

const featureToggles =
  developmentSettingsService.outputs.$featureToggles.getState();
const { TasksIsOpen } = tasksProfileService.gates;
const { DistrictBordersGroupPageGate } = districtBordersByAddressService.gates;

function RouterWrapper() {
  return (
    <Layout>
      <CurrentUserGate />
      <CurrentManagingFirmGate />

      <Panel />
      <div />
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </Layout>
  );
}

const TasksRouterWrapper = () => {
  return (
    <>
      <TasksIsOpen />
      <Outlet />
    </>
  );
};

const DistrictBordersRouterWrapper = () => {
  return (
    <>
      <DistrictBordersGroupPageGate />
      <Outlet />
    </>
  );
};

export const useRoutes = (
  currentUserRoles: ESecuredIdentityRoleNameStringDictionaryItem[],
) => {
  const { isAuth } = useUnit({ isAuth: tokensService.outputs.$isAuth });

  const roles =
    currentUserRoles?.reduce((acc, { key }) => {
      if (!key) {
        return acc;
      }
      return [...acc, key];
    }, [] as ESecuredIdentityRoleName[]) || [];

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

  const redirectRoute = useMemo(() => {
    if (!isAuth) return '/login';

    const defaultPath = '/tasks';

    return isSeniorOperator || isOperator ? '/meters/apartments' : defaultPath;
  }, [isOperator, isSeniorOperator, isAuth]);

  const initialTasksPath = isSpectator
    ? `/tasks/list/${TaskGroupingFilter.Observing}`
    : `/tasks/list/${TaskGroupingFilter.Executing}`;

  const isShowNodeArchivePage =
    isAdministrator ||
    isExecutor ||
    isSpectator ||
    isSpectatingAdministrator ||
    isRescrictedSpectator;

  if (!isAuth) {
    return [
      {
        path: '/login',
        element: <LoginContainer />,
      },
      {
        path: '/registration*',
        element: <RegistrationContainer />,
      },
      {
        path: '*',
        element: <Navigate replace to={redirectRoute} />,
      },
    ];
  }

  return [
    {
      path: '/registration*',
      element: <RegistrationContainer />,
    },
    {
      path: '*',
      element: <Navigate replace to={redirectRoute} />,
    },
    {
      path: '/',
      element: <RouterWrapper />,
      children: [
        {
          path: '/',
          element: <Navigate replace to={redirectRoute} />,
        },
        {
          path: '/actsJournal',
          element:
            isSeniorOperator || isOperator ? (
              <ActsJournalContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/buildings/create',
          element: isAdministrator ? (
            <CreateObjectContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/buildings/:houseCategory/:buildingId/edit',
          element: isAdministrator ? (
            <EditObjectContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/buildings/:houseCategory/:buildingId/addNode',
          element:
            isAdministrator || isExecutor ? (
              <CreateNodeContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/districtBordersSettings',
          element: <DistrictBordersRouterWrapper />,
          children: [
            {
              path: '/districtBordersSettings/createByHousingStocksList',
              element:
                isSeniorOperator || isOperator ? (
                  <DistrictBordersByAddressContainer />
                ) : (
                  <AccessDeniedPage />
                ),
            },
            {
              path: '/districtBordersSettings/editDistrictBorders/:id',
              element:
                isSeniorOperator || isOperator ? (
                  <EditDistrictBordersContainer />
                ) : (
                  <AccessDeniedPage />
                ),
            },
            {
              path: '/districtBordersSettings/createByMap',
              element:
                isSeniorOperator || isAdministrator ? (
                  <CreateDistrictBorderMapContainer />
                ) : (
                  <AccessDeniedPage />
                ),
            },
            {
              path: '/districtBordersSettings/manageDistricts',
              element:
                isSeniorOperator || isAdministrator ? (
                  <ManageDistrictsMapContainer />
                ) : (
                  <AccessDeniedPage />
                ),
            },
          ],
        },

        {
          path: '/tasks',
          element: <Navigate replace to={initialTasksPath} />,
        },
        {
          path: '/tasks',
          element: <TasksRouterWrapper />,
          children: [
            {
              path: '/tasks/profile/:taskId',
              element: <TaskProfileContainer />,
            },
            {
              path: '/tasks/list/:grouptype',
              element: <TasksProfileContainer />,
            },
          ],
        },
        {
          path: '/apartments/:apartmentId/edit',
          element:
            isAdministrator || isSeniorOperator || isOperator ? (
              <EditApartmentProfileContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/apartments/:apartmentId/:tabSection?',
          element: <ApartmentProfileContainer />,
        },
        {
          path: '/buildings/:searchType?',
          element: <ObjectsProfileContainer />,
        },
        {
          path: '/buildings/livingProfile/:buildingId/:section?',
          element: <HousingStockProfileContainer />,
        },
        {
          path: '/buildings/nonResidentialProfile/:buildingId/:section?',
          element: <NonResidentialBuildingProfileContainer />,
        },
        {
          path: '/devices/addNode',
          element:
            isAdministrator || isExecutor ? (
              <CreateNodeContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/devices/:type?',
          element: <DevicesPageContainer />,
        },
        {
          path: '/changeODPU/:oldDeviceId',
          element:
            isAdministrator || isExecutor ? (
              <ChangeODPUContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/electricNode/:deviceId/edit',
          element:
            isAdministrator || isSeniorOperator || isOperator || isExecutor ? (
              <EditElectricNodeContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/companyProfile/editManagingFirmUser/:id',
          element: isAdministrator ? (
            <EditEmployeeContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/companyProfile/:section?',
          element: isAdministrator ? (
            <CompanyProfileContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/editCompany',
          element: isAdministrator ? (
            <EditCompanyContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/userProfile/:id',
          element: isAdministrator ? (
            <EmployeeProfileContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/calculators/:deviceId/edit',
          element:
            isAdministrator || isExecutor ? (
              <EditCalculatorContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/calculators/:deviceId/profile/:section?',
          element: <CalculatorProfileContainer />,
        },
        {
          path: '/nodes/:nodeId/edit',
          element:
            isAdministrator || isExecutor ? (
              <EditNodeContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/nodes/:nodeId/:section?',
          element: <NodeProfileContainer />,
        },
        {
          path: '/housingMeteringDevices/:deviceId/edit',
          element:
            isAdministrator || isExecutor || isSeniorOperator || isOperator ? (
              <EditHousingMeteringDeviceContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/housingMeteringDevices/:deviceId/profile/:section?',
          element: <HousingMeteringDeviceProfileContainer />,
        },
        {
          path: '/individualDeviceProfile/:id',
          element:
            isSeniorOperator || isExecutor || isAdministrator || isOperator ? (
              <IndividualMeteringDeviceProfileContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/individualDevices/:deviceId/edit',
          element:
            isAdministrator || isSeniorOperator || isExecutor || isOperator ? (
              <EditIndividualDeviceContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/meters/:section/:id?',
          element: <MetersContainer />,
        },
        {
          path: '/services/:service/:section/:id?',
          element: <ServicesContainer />,
        },
        {
          path: '/nodeArchive/:nodeId',
          element: isShowNodeArchivePage ? (
            <NodeArchivePageContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/settings/:section?',
          element:
            isSeniorOperator || isOperator ? (
              <SettingsPageContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/adminSettings/:section?',
          element: isAdministrator ? (
            <SettingsPageContainer isAdminSettings />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/adminSettings/operatingRanges/Standart',
          element: isAdministrator ? (
            <StandartWorkingRangeContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/adminSettings/operatingRanges/Group',
          element: isAdministrator ? (
            <GroupWorkingRangeContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/adminSettings/operatingRanges/Unique',
          element: isAdministrator ? (
            <UniqueWorkingRangeContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/statistics/',
          element: <Navigate replace to="/statistics/resourceConsumption" />,
        },
        {
          path: '/statistics/subscribersConsumption',
          element: (
            <Navigate replace to="/statistics/subscribersConsumption/houses" />
          ),
        },
        {
          path: '/statistics/:grouptype/:searchType?',
          element: <StatisticsProfileContainer />,
        },
        {
          path: '/reports',
          element: featureToggles.reportsConstructor ? (
            isSeniorOperator ? (
              <ReportsContainer />
            ) : (
              <AccessDeniedPage />
            )
          ) : isSeniorOperator ? (
            <ReportsPageContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/statistics/:grouptype/:searchType?',
          element: <StatisticsProfileContainer />,
        },
        {
          path: '/reports/:reportType',
          element: isSeniorOperator ? (
            <ReportViewContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        {
          path: '/apartment/:id/addIndividualDevice',
          element:
            isAdministrator || isSeniorOperator || isOperator ? (
              <AddIndividualDeviceContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/apartment/:id/individualDevice/:deviceId/switch',
          element:
            isAdministrator || isSeniorOperator || isOperator ? (
              <WorkWithIndividualDeviceContainer
                type={WorkWithIndividualDeviceType.switch}
              />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/apartment/:id/individualDevice/:deviceId/check',
          element:
            isAdministrator || isSeniorOperator || isOperator ? (
              <WorkWithIndividualDeviceContainer
                type={WorkWithIndividualDeviceType.check}
              />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/apartment/:id/individualDevice/:deviceId/reopen',
          element:
            isSeniorOperator || isOperator ? (
              <WorkWithIndividualDeviceContainer
                type={WorkWithIndividualDeviceType.reopen}
              />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/apartment/:id/homeowners/add',
          element:
            isAdministrator || isSeniorOperator || isOperator ? (
              <AddPersonalNumberContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/apartment/:id/homeowners/:homeownerId/split',
          element:
            isAdministrator || isSeniorOperator || isOperator ? (
              <SplitPersonalNumberContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/apartment/:id/homeowners/:homeownerId/edit',
          element:
            isAdministrator || isSeniorOperator || isOperator ? (
              <EditPersonalNumberContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/apartment/:id/homeowners/:homeownerId/switch',
          element:
            isAdministrator || isSeniorOperator || isOperator ? (
              <SwitchPersonalNumberContainer />
            ) : (
              <AccessDeniedPage />
            ),
        },
        {
          path: '/disabledResources',
          element: isDispatcher ? (
            <ResourceDisablingScheduleContainer />
          ) : (
            <AccessDeniedPage />
          ),
        },
        { path: '/access-denied/', element: <AccessDeniedPage /> },
        {
          path: '/services',
          element: <Navigate replace to="/services/seal" />,
        },
        {
          path: '/services/seal',
          element: <Navigate replace to="/services/seal/select" />,
        },
        {
          path: '/meters',
          element: <Navigate replace to="/meters/apartments" />,
        },
      ],
    },
  ];
};
