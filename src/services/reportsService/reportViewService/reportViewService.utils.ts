import dayjs from 'api/dayjs';
import {
  IndividualDeviceReportRequestPaload,
  ReportDatePeriod,
  ReportFiltrationFormValues,
  ActsJournalReportRequestPayload,
  HousingMeteringDevicesReportRequestPayload,
  HomeownersReportRequestPayload,
  ReportPayload,
  EmployeeReportRequestPayload,
} from './reportViewService.types';
import { EmployeeReportDatePeriodDictionary } from './view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.constants';
import {
  EmployeeReportDatePeriodType,
  EmployeeReportType,
} from './view/ReportViewPage/ReportFiltrationForm/ReportFiltrationForm.types';

export const getReportPayloadValues = ({ values }: ReportPayload) => values;

const getDatePeriod = (
  reportDatePeriod: ReportDatePeriod | null,
  dates: { from: dayjs.Dayjs | null; to: dayjs.Dayjs | null },
) => {
  if (!reportDatePeriod) return null;

  let from = dayjs(),
    to = dayjs();

  if (reportDatePeriod === ReportDatePeriod.FromStartOfMonth) {
    from = dayjs().startOf('month');
  }

  if (reportDatePeriod === ReportDatePeriod.PreviousMonth) {
    from = dayjs().add(-1, 'month').startOf('month');
    to = dayjs().add(-1, 'month').endOf('month');
  }

  if (reportDatePeriod === ReportDatePeriod.LastDay) {
    from = dayjs().startOf('day');
    to = dayjs().endOf('day');
  }

  if (reportDatePeriod === ReportDatePeriod.LastSevenDays) {
    from = dayjs().add(-1, 'week').startOf('week');
  }

  if (reportDatePeriod === ReportDatePeriod.AnyPeriod) {
    from = dayjs(dates.from);
    to = dayjs(dates.to);
  }

  return { from: from?.format('YYYY-MM-DD'), to: to?.format('YYYY-MM-DD') };
};

const getAddressId = (
  values: ReportFiltrationFormValues,
): { HousingStocksIds: number[]; HouseManagementId?: string | undefined } => {
  return {
    HousingStocksIds: values.housingStockIds,
    HouseManagementId: values.housingStockIds.length
      ? undefined
      : values.houseManagement || undefined,
  };
};

export const prepareIndividualDevicesReportRequestPayload = (
  values: ReportFiltrationFormValues,
): IndividualDeviceReportRequestPaload | null => {
  if (!values.reportOption) return null;

  const dates = getDatePeriod(values.reportDatePeriod, {
    from: values.from,
    to: values.to,
  });

  const { HouseManagementId, HousingStocksIds } = getAddressId(values);

  return {
    HouseManagementId,
    HousingStocksIds,
    ReportOption: values.reportOption,
    Resources: values.resources,
    From: dates?.from,
    To: dates?.to,
    ClosingReasons: values.closingReasons,
    WithoutApartmentsWithOpenDevicesByResources:
      values.withoutApartmentsWithOpenDevicesByResources,
  };
};

export const prepareActJournalReportRequestPayload = (
  values: ReportFiltrationFormValues,
): ActsJournalReportRequestPayload | null => {
  const dates = getDatePeriod(values.reportDatePeriod, {
    from: values.from,
    to: values.to,
  });

  if (!values.housingStockIds.length && !values.houseManagement) return null;

  const { HouseManagementId, HousingStocksIds } = getAddressId(values);

  return {
    HouseManagementId,
    HousingStocksIds,
    From: dates?.from,
    To: dates?.to,
    Resources: values.actResources,
  };
};

export const prepareHousingMeteringDevicesReportRequestPayload = (
  values: ReportFiltrationFormValues,
): HousingMeteringDevicesReportRequestPayload | null => {
  const dates = getDatePeriod(values.reportDatePeriod, {
    from: values.from,
    to: values.to,
  });

  if (!dates) return null;

  const { HouseManagementId, HousingStocksIds } = getAddressId(values);

  return {
    HouseManagementId,
    HousingStocksIds,
    From: dates.from,
    To: dates.to,
    Resources: values.resources,
  };
};

export const prepareHomeownersReportRequestPayload = (
  values: ReportFiltrationFormValues,
): HomeownersReportRequestPayload | null => {
  const { HouseManagementId, HousingStocksIds } = getAddressId(values);

  if (!HouseManagementId && !HousingStocksIds.length) return null;

  return {
    HouseManagementId,
    HousingStocksIds,
    ShowOnlyDuplicates: values.showOnlyDuplicates,
  };
};

const getCallCenterReportDatePeriod = (
  from: null | dayjs.Dayjs,
  to: null | dayjs.Dayjs,
) => {
  return {
    From: from?.utcOffset(0)?.format('YYYY-MM-DD'),
    To: to?.utcOffset(0)?.format('YYYY-MM-DD'),
  };
};

const getEmployeeReportDatePeriod = (
  employeeReportDatePeriodType: EmployeeReportDatePeriodType,
  employeeReportDate: dayjs.Dayjs | null,
) => {
  if (!employeeReportDate) return null;

  const period =
    EmployeeReportDatePeriodDictionary[employeeReportDatePeriodType];

  return {
    From: employeeReportDate.utcOffset(0).startOf(period).format('YYYY-MM-DD'),
    To: employeeReportDate.utcOffset(0).endOf(period).format('YYYY-MM-DD'),
  };
};

export const prepareEmployeeReportRequestPayload = (
  values: ReportFiltrationFormValues,
): EmployeeReportRequestPayload | null => {
  const isCallCenterReport =
    values.employeeReportType === EmployeeReportType.CallCenterWorkingReport;

  if (!values.employeeReportType) return null;

  const period = isCallCenterReport
    ? getCallCenterReportDatePeriod(values.from, values.to)
    : values.employeeReportDatePeriodType &&
      getEmployeeReportDatePeriod(
        values.employeeReportDatePeriodType,
        values.employeeReportDate,
      );

  if (!period) return null;

  return {
    employeeReportType: values.employeeReportType,
    From: period.From,
    To: period.To,
  };
};
