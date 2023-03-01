import React, { ReactNode } from 'react';
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
  [ReportType.ActsJournal]: 'Отчёт по журналу акта',
  [ReportType.HousingDevices]: 'Отчёт по общедомовым приборам',
  [ReportType.Homeowners]: 'Отчёт по собственникам',
  [ReportType.Employee]: 'Отчёт по сотрудникам',
};

export const ReportIconsDictionary: {
  [key in ReportType]: ReactNode;
} = {
  [ReportType.IndividualDevices]: <DeviceIcon />,
  [ReportType.ActsJournal]: <ListIcon />,
  [ReportType.HousingDevices]: <CalculatorIcon />,
  [ReportType.Homeowners]: <PersonIcon />,
  [ReportType.Employee]: <UserIcon />,
};

export const reportsSelectItems: ReportType[] = Object.values(ReportType);
