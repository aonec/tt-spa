import { ESecuredIdentityRoleName } from 'api/myApi';

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
