import moment from 'moment';
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
  dates: { from: moment.Moment | null; to: moment.Moment | null },
) => {
  if (!reportDatePeriod) return null;

  let from = moment(),
    to = moment();

  if (reportDatePeriod === ReportDatePeriod.FromStartOfMonth) {
    from = moment().startOf('month');
  }

  if (reportDatePeriod === ReportDatePeriod.PreviousMonth) {
    from = moment().add(-1, 'month').startOf('month');
    to = moment().add(-1, 'month').endOf('month');
  }

  if (reportDatePeriod === ReportDatePeriod.LastDay) {
    from = moment().startOf('day');
    to = moment().endOf('day');
  }

  if (reportDatePeriod === ReportDatePeriod.LastSevenDays) {
    from = moment().add(-1, 'week').startOf('week');
  }

  if (reportDatePeriod === ReportDatePeriod.AnyPeriod) {
    from = moment(dates.from);
    to = moment(dates.to);
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
  from: null | moment.Moment,
  to: null | moment.Moment,
) => {
  return {
    From: from?.utcOffset(0)?.format('YYYY-MM-DD'),
    To: to?.utcOffset(0)?.format('YYYY-MM-DD'),
  };
};

const getEmployeeReportDatePeriod = (
  employeeReportDatePeriodType: EmployeeReportDatePeriodType,
  employeeReportDate: moment.Moment | null,
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
  if (!values.employeeReportType || !values.employeeReportDatePeriodType)
    return null;

  const period =
    values.employeeReportType === EmployeeReportType.CallCenterWorkingReport
      ? getCallCenterReportDatePeriod(values.from, values.to)
      : getEmployeeReportDatePeriod(
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
