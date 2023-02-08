import { ReportDatePeriod } from "services/reportsService/reportViewService/reportViewService.types";

export const ReportPeriodDictionary: { [key in ReportDatePeriod]: string } = {
  [ReportDatePeriod.LastDay]: 'Последние сутки',
  [ReportDatePeriod.LastSevenDays]: 'Последние 7 дней',
  [ReportDatePeriod.FromStartOfMonth]: 'С начала месяца',
  [ReportDatePeriod.PreviousMonth]: 'За прошлый месяц',
  [ReportDatePeriod.AnyPeriod]: 'Произвольный период',
};
