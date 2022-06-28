import { ESecuredIdentityRoleName } from 'myApi';
import {
  CompanyProfileIcon,
  DeviceIcon,
  DocumentIcon,
  ObjectsIcon,
  ReportsIcon,
  SettingsIcon,
  StatisticIcon,
  TasksIcon,
} from 'ui-kit/icons';
import { MenuFiltrationConfig, MenuItem, MenuType } from './menuService.types';

export const menuItems: MenuItem[] = [
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
    icon: StatisticIcon,
    type: MenuType.ActsJournal,
  },
  {
    title: 'Задачи',
    path: '/tasks',
    icon: TasksIcon,
    type: MenuType.Tasks,
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
    path: '/companyProfile',
    icon: CompanyProfileIcon,
    type: MenuType.CompanyProfile,
  },
  {
    title: 'Ввод показаний',
    path: '/meters',
    icon: DocumentIcon,
    type: MenuType.Meters,
    sub: [
      {
        title: 'По квартирам',
        path: '/meters/apartments',
        type: MenuType.MetersApartments,
      },
      {
        title: 'По домам',
        path: '/meters/houses',
        type: MenuType.MetersApartments,
      },
      {
        title: 'По узлам учёта',
        path: '/meters/accountingNodes',
        type: MenuType.MetersApartments,
      },
    ],
  },
  {
    title: 'Настройки',
    path: '/settings/controllers',
    icon: SettingsIcon,
    type: MenuType.Settings,
  },
];

export const privates: MenuFiltrationConfig = {
  [MenuType.Meters]: [ESecuredIdentityRoleName.ManagingFirmOperator],
  [MenuType.ActsJournal]: [ESecuredIdentityRoleName.ManagingFirmOperator],
  [MenuType.Reports]: [ESecuredIdentityRoleName.ManagingFirmSeniorOperator],
  [MenuType.Settings]: [ESecuredIdentityRoleName.ManagingFirmSeniorOperator],
  [MenuType.CompanyProfile]: [
    ESecuredIdentityRoleName.ManagingFirmAdministrator,
  ],
};

export const hidden: MenuFiltrationConfig = {
  [MenuType.Statistics]: [ESecuredIdentityRoleName.ManagingFirmOperator],
  [MenuType.Devices]: [ESecuredIdentityRoleName.ManagingFirmOperator],
};
