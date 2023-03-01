import { ReportDatePeriod } from 'services/reportsService/reportViewService/reportViewService.types';
import { DigitCountTextList } from 'utils/getCountText';

export const ReportPeriodDictionary: { [key in ReportDatePeriod]: string } = {
  [ReportDatePeriod.LastDay]: 'Последние сутки',
  [ReportDatePeriod.LastSevenDays]: 'Последние 7 дней',
  [ReportDatePeriod.FromStartOfMonth]: 'С начала месяца',
  [ReportDatePeriod.PreviousMonth]: 'За прошлый месяц',
  [ReportDatePeriod.AnyPeriod]: 'Произвольный период',
};

export const addressesCountTexts: DigitCountTextList = [
  {
    digits: [0, 5, 6, 7, 8, 9, 11, 12, 13, 14],
    text: 'адресов',
  },
  {
    digits: [1],
    text: 'адрес',
  },
  {
    digits: [2, 3, 4],
    text: 'адреса',
  },
];

export const selectedCountTexts: DigitCountTextList = [
  {
    digits: [0, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14],
    text: 'Выбрано',
  },
  {
    digits: [1],
    text: 'Выбран',
  },
];
