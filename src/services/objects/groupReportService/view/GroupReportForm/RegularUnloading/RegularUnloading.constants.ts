import { GroupReportConfigurationPeriod } from 'api/types';

export const SubsTypeRadioOptions = [
  {
    value: GroupReportConfigurationPeriod.EveryTwoWeeks,
    label: '1 раз в 2 недели',
  },
  { value: GroupReportConfigurationPeriod.EveryMonth, label: '1 раз в месяц' },
];
