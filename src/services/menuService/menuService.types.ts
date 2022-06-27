export enum MenuType {
  Statistics = 'Statistics',
  Reports = 'Reports',
  ActsJournal = 'ActsJournal',
  Tasks = 'Tasks',
  Objects = 'Objects',
  Devices = 'Devices',
  CompanyProfile = 'CompanyProfile',
  Owners = 'Owners',
  Meters = 'Meters',
  MetersApartments = 'MetersApartments',
  Settings = 'Settings',
  Log = 'Log',
}

type Icon = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;

export type MenuItem = {
  title: string;
  path: string;
  icon: Icon;
  type: MenuType;
  sub?: SubMenuItem[];
};

export type SubMenuItem = Omit<MenuItem, 'sub' | 'icon'>;

export type MenuFiltrationConfig = {
  [key: string]: MenuType[];
};
