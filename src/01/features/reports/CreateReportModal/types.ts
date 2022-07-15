export enum ReportType {
  OperatorsWorkingReport = 'OperatorsWorkingReport',
  HouseManagementsReport = 'HouseManagementsReport',
}

export function getReportTypeTitleName(type: ReportType) {
  const types: { [K in ReportType]: string } = {
    [ReportType.OperatorsWorkingReport]: 'Отчет по операторам',
    [ReportType.HouseManagementsReport]: "Сводный отчет принятых показаний"
  };

  return types[type];
}

export const reportTypeTitleNames = Object.keys(ReportType).map((key) => ({
  name: getReportTypeTitleName(key as ReportType),
  type: key,
}));
