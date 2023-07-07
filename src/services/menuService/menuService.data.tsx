import { ESecuredIdentityRoleName } from 'myApi';
import {
  CompanyProfileIcon,
  DeviceIcon,
  DocumentIcon,
  ListIcon,
  ObjectsIcon,
  ReportsIcon,
  SettingsIcon,
  StatisticIcon,
  TasksIcon,
  WrenchIcon,
} from 'ui-kit/icons';
import { MenuFiltrationConfig, MenuItem, MenuType } from './menuService.types';
import { MeterSection } from 'services/meters/metersService/metersService.types';
import { ServiceSection } from 'services/services/servicesService/servicesService.types';
import { featureToggles } from 'featureToggles';

export const menuItems: MenuItem[] = [
  {
    title: 'Задачи',
    path: '/tasks',
    icon: TasksIcon,
    type: MenuType.Tasks,
  },
  {
    title: 'Статистика',
    path: '/statistics',
    icon: StatisticIcon,
    type: MenuType.Statistics,
  },
  {
    title: 'Отчеты',
    path: '/reports',
    icon: ReportsIcon,
    type: MenuType.Reports,
  },
  {
    title: 'Журнал актов',
    path: '/actsJournal',
    icon: ListIcon,
    type: MenuType.ActsJournal,
  },
  {
    title: 'Отключения ресурсов',
    path: '/disabledResources',
    icon: SettingsIcon,
    type: MenuType.DisabledResourcesDispatcher,
  },
  {
    title: 'Объекты',
    path: '/objects',
    icon: ObjectsIcon,
    type: MenuType.Objects,
  },
  {
    title: 'Приборы',
    path: '/devices',
    icon: DeviceIcon,
    type: MenuType.Devices,
  },
  {
    title: 'Профиль компании',
    path: '/companyProfile/commonInfo',
    icon: CompanyProfileIcon,
    type: MenuType.CompanyProfile,
  },
  {
    title: 'Ввод показаний',
    path: `/meters/${MeterSection.Apartments}`,
    icon: DocumentIcon,
    type: MenuType.Meters,
    sub: [
      {
        title: 'По квартирам',
        path: `/meters/${MeterSection.Apartments}`,
        type: MenuType.MetersApartments,
      },
      {
        title: 'По домам',
        path: `/meters/${MeterSection.Houses}`,
        type: MenuType.MetersApartments,
      },
      {
        title: 'По узлам учёта',
        path: `/meters/${MeterSection.AccountingNodes}`,
        type: MenuType.MetersApartments,
      },
    ],
  },
  ...(featureToggles.services
    ? [
        {
          title: 'Услуги',
          path: `/services`,
          icon: WrenchIcon,
          type: MenuType.Services,
          sub: [
            {
              title: 'Опломбировка',
              path: `/services/${ServiceSection.Seal}`,
              type: MenuType.ServicesSeal,
            },
          ],
        },
      ]
    : ([] as MenuItem[])),
  {
    title: 'Настройки',
    path: '/settings/controllers',
    icon: SettingsIcon,
    type: MenuType.Settings,
  },
  {
    title: 'Настройки',
    path: '/adminSettings/disabledResources',
    icon: SettingsIcon,
    type: MenuType.SettingsAdministrator,
  },
];

export const privates: MenuFiltrationConfig = {
  [MenuType.Meters]: [ESecuredIdentityRoleName.Operator],
  [MenuType.Services]: [ESecuredIdentityRoleName.Operator],
  [MenuType.ActsJournal]: [ESecuredIdentityRoleName.Operator],
  [MenuType.Reports]: [ESecuredIdentityRoleName.SeniorOperator],
  [MenuType.Settings]: [ESecuredIdentityRoleName.SeniorOperator],
  [MenuType.CompanyProfile]: [ESecuredIdentityRoleName.Administrator],
  [MenuType.SettingsAdministrator]: [ESecuredIdentityRoleName.Administrator],
  [MenuType.DisabledResourcesDispatcher]: [
    ESecuredIdentityRoleName.ManagingFirmDispatcher,
  ],
};

export const hidden: MenuFiltrationConfig = {
  [MenuType.Devices]: [ESecuredIdentityRoleName.ManagingFirmDispatcher],
  [MenuType.Statistics]: [ESecuredIdentityRoleName.ManagingFirmDispatcher],
};
