import { GroupReportSchedulePeriod } from 'api/types';

export const SubsTypeRadioOptions = [
  { value: GroupReportSchedulePeriod.EveryTwoWeeks, label: '1 раз в 2 недели' },
  { value: GroupReportSchedulePeriod.EveryMonth, label: '1 раз в месяц' },
  { value: GroupReportSchedulePeriod.EveryQuarter, label: '1 раз в квартал' },
];
