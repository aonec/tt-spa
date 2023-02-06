import moment from 'moment';
import {
  IndividualDeviceReportRequestPaload,
  ReportDatePeriod,
  ReportFiltrationFormValues,
} from './reportViewService.types';

const getDatePeriod = (
  reportDatePeriod: ReportDatePeriod,
  dates: { from: moment.Moment | null; to: moment.Moment | null },
) => {
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

export const prepareIndividualDevicesReportData = (
  values: ReportFiltrationFormValues,
): IndividualDeviceReportRequestPaload | null => {
  if (!values.reportOption) return null;

  const dates =
    values.reportDatePeriod &&
    getDatePeriod(values.reportDatePeriod, {
      from: values.from,
      to: values.to,
    });

  return {
    HousingStockId: values.housingStockId || undefined,
    HouseManagementId: values.housingStockId
      ? undefined
      : values.houseManagement || undefined,
    ReportOption: values.reportOption,
    Resources: values.resources,
    From: dates?.from,
    To: dates?.to,
    ClosingReasons: values.closingReasons,
  };
};
