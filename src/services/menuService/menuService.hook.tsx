import { useUnit } from 'effector-react';
import {
  CompanyProfileIcon,
  CurrentAnalyticsIcon,
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
import { MenuItem, MenuType } from './menuService.types';
import { MeterSection } from 'services/meters/metersService/metersService.types';
import { ServiceSection } from 'services/services/servicesService/servicesService.types';
import { developmentSettingsService } from 'services/developmentSettings/developmentSettings.models';

export const useMenuItems = (): MenuItem[] => {
  const { featureToggles } = useUnit({
    featureToggles: developmentSettingsService.outputs.$featureToggles,
  });

  return [
    {
      title: 'Текущая ситуация',
      path: `/supervisor/currentAnalytics`,
      icon: CurrentAnalyticsIcon,
      type: MenuType.SupervisorAnalytics,
    },
    {
      title: 'Общая аналитика',
      path: `/supervisor/commonAnalytics`,
      icon: StatisticIcon,
      type: MenuType.SupervisorAnalytics,
    },
    // {
    //   title: 'Потребление ресурсов',
    //   path: `/supervisor/consumption`,
    //   icon: StatisticIcon,
    //   type: MenuType.SupervisorAnalytics,
    // },
    {
      title: 'Задачи',
      path: '/tasks',
      icon: TasksIcon,
      type: MenuType.Tasks,
    },
    {
      title: 'Статистика и данные',
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
      path: '/buildings',
      icon: ObjectsIcon,
      type: MenuType.Buildings,
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
      title: 'Настройки оператора',
      path: '/settings',
      icon: SettingsIcon,
      type: MenuType.Settings,
    },
    {
      title: 'Настройки',
      path: '/adminSettings',
      icon: SettingsIcon,
      type: MenuType.SettingsAdministrator,
    },
  ];
};
