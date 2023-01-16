import React from 'react';
import { ReportSelectItem } from './ReportsPage.types';
import { CalculatorIcon, DeviceIcon, ListIcon, PersonIcon, UserIcon } from 'ui-kit/icons';
import { EReportName } from 'myApi';

export const reportsSelectItems: ReportSelectItem[] = [
  {
    name: 'Отчёт по ИПУ',
    icon: <DeviceIcon />,
    reportName: EReportName.ClosedDevicesReport,
  },
  {
    name: 'Отчёты по журналу акта',
    icon: <ListIcon />,
    reportName: EReportName.HouseManagementsReport,
  },
  {
    name: 'Отчёт по общедомовым приборам',
    icon: <CalculatorIcon />,
    reportName: EReportName.ClosedDevicesReport,
  },
  {
    name: 'Отчёт по собственникам',
    icon: <PersonIcon />,
    reportName: EReportName.ClosedDevicesReport,
  },
  {
    name: 'Отчёт по сотрудникам',
    icon: <UserIcon />,
    reportName: EReportName.ClosedDevicesReport,
  },
];
