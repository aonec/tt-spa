import moment from 'moment';
import { ArchiveType, DatePeriod } from './ConsolidatedReportForm.types';

export const getDatePeriod = (
  archiveType: ArchiveType,
  period: DatePeriod
): { From: string; To: string } | null => {
  if (archiveType === ArchiveType.StartOfMonth) {
    period = [moment().startOf('month'), moment()];
  }

  if (archiveType === ArchiveType.PreviousMonth) {
    period = [
      moment().subtract(1, 'months').startOf('month'),
      moment().startOf('month'),
    ];
  }

  if (!period[0] || !period[1]) return null;

  const From = period[0].startOf('day').toISOString();
  const To = period[1].endOf('day').toISOString();

  return { From, To };
};
