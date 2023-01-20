import React from 'react';
import { ReportSelectItem } from './ReportsPage.types';
import {
  CalculatorIcon,
  DeviceIcon,
  ListIcon,
  PersonIcon,
  UserIcon,
} from 'ui-kit/icons';
import { ReportType } from './ReportsPage.types';

export const ReportNamesDictionary: {
  [key in ReportType]: string;
} = {
  [ReportType.IndividualDevices]: 'Отчёт по ИПУ',
  [ReportType.ActsJournal]: 'Отчёты по журналу акта',
  [ReportType.HousingDevices]: 'Отчёт по общедомовым приборам',
  [ReportType.Homeowners]: 'Отчёт по собственникам',
  [ReportType.Employee]: 'Отчёт по сотрудникам',
};

export const reportsSelectItems: ReportSelectItem[] = [
  {
    icon: <DeviceIcon />,
    reportType: ReportType.IndividualDevices,
  },
  {
    icon: <ListIcon />,
    reportType: ReportType.ActsJournal,
  },
  {
    icon: <CalculatorIcon />,
    reportType: ReportType.HousingDevices,
  },
  {
    icon: <PersonIcon />,
    reportType: ReportType.Homeowners,
  },
  {
    icon: <UserIcon />,
    reportType: ReportType.Employee,
  },
];
