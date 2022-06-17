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
import { MenuItem, MenyType } from './menuService.types';
import { Menu } from './view/Menu';
import { UserInfo } from './view/UserInfo';

const menuItems: MenuItem[] = [
  {
    title: 'Статистика',
    path: '/statistics',
    icon: StatisticIcon,
    type: MenyType.Statistics,
  },
  {
    title: 'Отчеты',
    path: '/reports',
    icon: ReportsIcon,
    type: MenyType.Reports,
  },
  {
    title: 'Журнал актов',
    path: '/actsJournal',
    icon: StatisticIcon,
    type: MenyType.ActsJournal,
  },
  {
    title: 'Задачи',
    path: '/tasks',
    icon: TasksIcon,
    type: MenyType.Tasks,
  },
  {
    title: 'Объекты',
    path: '/objects',
    icon: ObjectsIcon,
    type: MenyType.Objects,
  },
  {
    title: 'Приборы',
    path: '/devices',
    icon: DeviceIcon,
    type: MenyType.Devices,
  },
  {
    title: 'Профиль компании',
    path: '/companyProfile',
    icon: CompanyProfileIcon,
    type: MenyType.CompanyProfile,
  },
  {
    title: 'Ввод показаний',
    path: '/meters',
    icon: DocumentIcon,
    type: MenyType.Meters,
  },
  {
    title: 'Настройки',
    path: '/settings/controllers',
    icon: SettingsIcon,
    type: MenyType.Settings,
  },
];

const access: { [key: string]: string[] } = {
  [MenyType.Reports]: ['ManagingFirmSeniorOperator'],
  [MenyType.Meters]: ['ManagingFirmOperator'],
  [MenyType.Statistics]: ['ManagingFirmSeniorOperator'],
  [MenyType.CompanyProfile]: ['ManagingFirmAdministrator'],
};

const hidden: { [key: string]: string[] } = {
  [MenyType.Statistics]: ['ManagingFirmOperator'],
  [MenyType.ActsJournal]: ['ManagingFirmOperator'],
  [MenyType.Tasks]: ['ManagingFirmOperator'],
};

const { outputs, gates } = menuService;
const { UserRolesGate, CurrentUserGate } = gates;

export const MenuContainer = () => {
  const roles = useStore(outputs.$userRoles);
  const currentUser = useStore(outputs.$currentUser);
  const isCurrentUserLoading = useStore(outputs.$isCurrentUserLoading);

  const filteredMenuItems = menuItems.filter(({ type }) => {
    const accessRoles = access[type];
    const hiddenRoles = hidden[type];

    if (!roles) return false;

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
