import moment from 'moment';
import {
  ArchiveType,
  DatePeriod,
} from './ConsumptionReportCalculatorForm.types';

export const getDatePeriod = (
  archiveType: ArchiveType,
  period: DatePeriod,
  isSono?: boolean,
): { From: string; To: string } | null => {
  if (archiveType === ArchiveType.StartOfMonth) {
    period = [moment().startOf('month'), moment()];
  }

  if (archiveType === ArchiveType.PreviousMonth) {
    period = [
      moment().subtract(1, 'months').startOf('month'),
      moment().subtract(1, 'months').endOf('month'),
    ];
  }
  if (archiveType === ArchiveType.LastSevenDays) {
    period = [moment().subtract(7, 'day'), moment()];
  }

  if (!period[0] || !period[1]) return null;

  const format = isSono ? 'month' : 'day';

  const From = period[0].startOf(format).format('YYYY-MM-DDTHH:mm:ss');
  const To = period[1].endOf(format).format('YYYY-MM-DDTHH:mm:ss');

  return { From, To };
};
