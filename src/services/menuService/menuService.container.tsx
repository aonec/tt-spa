import { useStore } from 'effector-react';
import React from 'react';
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
import { menuService } from './menuService.model';
import { MenuItem, MenuType } from './menuService.types';
import { Menu } from './view/Menu';
import { UserInfo } from './view/UserInfo';

const menuItems: MenuItem[] = [
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
  // {
  //   title: 'Приборы',
  //   path: '/devices',
  //   icon: DeviceIcon,
  //   type: MenuType.Devices,
  // },
  // {
  //   title: 'Профиль компании',
  //   path: '/companyProfile',
  //   icon: CompanyProfileIcon,
  //   type: MenuType.CompanyProfile,
  // },
  {
    title: 'Ввод показаний',
    path: '/meters',
    icon: DocumentIcon,
    type: MenuType.Meters,
    sub: [
      {
        title: 'По квартире',
        path: '/meters/apartments',
        type: MenuType.MetersApartments,
      },
      {
        title: 'По дому',
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

const { outputs, gates } = menuService;
const { UserRolesGate, CurrentUserGate } = gates;

export const MenuContainer = () => {
  const roles = useStore(outputs.$userRoles);
  const currentUser = useStore(outputs.$currentUser);
  const isCurrentUserLoading = useStore(outputs.$isCurrentUserLoading);

  const filteredMenuItems = menuItems.filter(({ type }) => {
    return true;
  });

  return (
    <>
      <UserRolesGate />
      <CurrentUserGate />
      <UserInfo isLoading={isCurrentUserLoading} currentUser={currentUser} />
      <Menu menuItems={filteredMenuItems} />
    </>
  );
};
