export enum GroupReportRangeOptions {
  ThisMonth = 'ThisMonth',
  LastMonth = 'LastMonth',
  CustomRange = 'CustomRange',
}

export const GroupReportRangeLookup = {
  [GroupReportRangeOptions.ThisMonth]: 'С начала месяца',
  [GroupReportRangeOptions.LastMonth]: 'За прошлый месяц',
  [GroupReportRangeOptions.CustomRange]: 'Произвольный период',
};
