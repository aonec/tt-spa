import {
  ResourceShortNamesDictionary,
  ReportOptionsDictionary,
} from 'dictionaries';
import { HouseManagementResponse, EResourceType } from 'api/types';
import {
  EmployeeReportTypesDictionary,
  ReportPeriodDictionary,
} from './ReportFiltrationForm/ReportFiltrationForm.constants';
import {
  ReportDatePeriod,
  ReportFiltrationFormValues,
} from '../../reportViewService.types';
import {
  EmployeeReportDatePeriodType,
  EmployeeReportType,
} from './ReportFiltrationForm/ReportFiltrationForm.types';
import dayjs from 'api/dayjs';

const getResourcesText = (resourcesList: EResourceType[]) => {
  return resourcesList
    .map((resource) => ResourceShortNamesDictionary[resource])
    .join(', ');
};

const getPeriodText = (
  reportDatePeriod: ReportDatePeriod | null,
  from: dayjs.Dayjs | null,
  to: dayjs.Dayjs | null,
) => {
  if (!reportDatePeriod) return null;

  if (reportDatePeriod !== ReportDatePeriod.AnyPeriod) {
    return ReportPeriodDictionary[reportDatePeriod];
  }

  if (!from || !to) return null;

  return `${from.format('DD.MM.YYYY')} — ${to.format('DD.MM.YYYY')}`;
};

export const getFiltersList = (
  filtrationValues: ReportFiltrationFormValues,
  houseManagements: HouseManagementResponse[] | null,
) => {
  const resourcesText = getResourcesText(filtrationValues.resources);

  const houseManagement = houseManagements?.find(
    (houseManagement) =>
      houseManagement.id === filtrationValues.houseManagement,
  );

  const isCallCenterReport =
    filtrationValues.employeeReportType ===
    EmployeeReportType.CallCenterWorkingReport;

  const reportDatePeriodType = isCallCenterReport
    ? ReportDatePeriod.AnyPeriod
    : filtrationValues.reportDatePeriod;

  const period = getPeriodText(
    reportDatePeriodType,
    filtrationValues.from,
    filtrationValues.to,
  );

  const reportOption =
    filtrationValues.reportOption &&
    ReportOptionsDictionary[filtrationValues.reportOption];

  const employeeReportType =
    filtrationValues.employeeReportType &&
    EmployeeReportTypesDictionary[filtrationValues.employeeReportType];

  const employeeReportDate = filtrationValues.employeeReportDate;

  const isEmployeeReportPeriodMonth =
    filtrationValues.employeeReportDatePeriodType ===
    EmployeeReportDatePeriodType.Month;

  const employeeReportDatePeriod =
    !isCallCenterReport &&
    employeeReportDate?.format(
      `${isEmployeeReportPeriodMonth ? 'MMMM' : ''} YYYY`,
    );

  return [
    filtrationValues.city,
    houseManagement?.name || null,
    resourcesText,
    employeeReportType,
    period,
    reportOption,
    employeeReportDatePeriod,
  ].filter(Boolean) as string[];
};
