import dayjs from 'api/dayjs';
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
    period = [dayjs().startOf('month'), dayjs()];
  }

  if (archiveType === ArchiveType.PreviousMonth) {
    period = [
      dayjs().subtract(1, 'months').startOf('month'),
      isSono
        ? dayjs().subtract(0, 'months').startOf('month')
        : dayjs().subtract(1, 'months').endOf('month'),
    ];
  }
  if (archiveType === ArchiveType.LastSevenDays) {
    period = [dayjs().subtract(7, 'day'), dayjs()];
  }

  if (!period[0] || !period[1]) return null;

  const format = isSono ? 'month' : 'day';

  const From = period[0].startOf(format).format('YYYY-MM-DDTHH:mm:ss');
  const To = isSono
    ? period[1].startOf(format).format('YYYY-MM-DDTHH:mm:ss')
    : period[1].endOf(format).format('YYYY-MM-DDTHH:mm:ss');

  return { From, To };
};
