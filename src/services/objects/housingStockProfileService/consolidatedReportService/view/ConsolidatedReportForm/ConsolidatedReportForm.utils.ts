import dayjs from 'api/dayjs';
import { ArchiveType, DatePeriod } from './ConsolidatedReportForm.types';

export const getDatePeriod = (
  archiveType: ArchiveType,
  period: DatePeriod,
): { From: string; To: string } | null => {
  if (archiveType === ArchiveType.StartOfMonth) {
    period = [dayjs().startOf('month'), dayjs()];
  }

  if (archiveType === ArchiveType.PreviousMonth) {
    period = [
      dayjs().subtract(1, 'months').startOf('month'),
      dayjs().subtract(1, 'months').endOf('month'),
    ];
  }

  if (!period[0] || !period[1]) return null;

  const From = period[0].startOf('day').format('YYYY-MM-DDTHH:mm:ss');
  const To = period[1].endOf('day').format('YYYY-MM-DDTHH:mm:ss');

  return { From, To };
};
