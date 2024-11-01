import { ESecuredIdentityRoleName } from 'api/types';

export type MenuContainerProps = {
  isOpen: boolean;
};

export enum MenuType {
  Statistics = 'Statistics',
  Reports = 'Reports',
  ActsJournal = 'ActsJournal',
  Tasks = 'Tasks',
  Buildings = 'Buildings',
  Devices = 'Devices',
  CompanyProfile = 'CompanyProfile',
  Owners = 'Owners',
  Meters = 'Meters',
  MetersApartments = 'MetersApartments',
  Settings = 'Settings',
  SettingsAdministrator = 'SettingsAdministrator',
  Log = 'Log',
  Services = 'Services',
  ServicesSeal = 'ServicesSeal',
  DisabledResourcesDispatcher = 'DisabledResourcesDispatcher',
  WorkWithReadings = 'WorkWithReadings',
}

type Icon = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;

export type MenuItem = {
  title: string;
  path: string;
  icon?: Icon;
  type: MenuType;
  sub?: SubMenuItem[];
};

export type SubMenuItem = Omit<MenuItem, 'sub' | 'icon'>;

export type MenuFiltrationConfig = {
  [key in keyof typeof MenuType]?: ESecuredIdentityRoleName[];
};
