import {
  ResourceShortNamesDictionary,
  ReportOptionsDictionary,
} from 'dictionaries';
import { HouseManagementResponse, EResourceType } from 'api/myApi';
import {
  addressesCountTexts,
  EmployeeReportTypesDictionary,
  ReportPeriodDictionary,
  selectedCountTexts,
} from './ReportFiltrationForm/ReportFiltrationForm.constants';
import {
  ReportDatePeriod,
  ReportFiltrationFormValues,
} from '../../reportViewService.types';
import { getCountText } from 'utils/getCountText';
import {
  EmployeeReportDatePeriodType,
  EmployeeReportType,
} from './ReportFiltrationForm/ReportFiltrationForm.types';

const getResourcesText = (resourcesList: EResourceType[]) => {
  return resourcesList
    .map((resource) => ResourceShortNamesDictionary[resource])
    .join(', ');
};

const getPeriodText = (
  reportDatePeriod: ReportDatePeriod | null,
  from: moment.Moment | null,
  to: moment.Moment | null,
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

  const selectedAddress = filtrationValues.housingStockIds.length
    ? `${getCountText(
        filtrationValues.housingStockIds.length,
        selectedCountTexts,
      )} ${filtrationValues.housingStockIds.length} ${getCountText(
        filtrationValues.housingStockIds.length,
        addressesCountTexts,
      )}`
    : null;

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
    selectedAddress,
    resourcesText,
    employeeReportType,
    period,
    reportOption,
    employeeReportDatePeriod,
  ].filter(Boolean) as string[];
};
