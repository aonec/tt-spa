export enum ReportType {
  OperatorsWorkingReport = 'OperatorsWorkingReport',
}

export function getReportTypeTitleName(type: ReportType) {
  const types: { [K in ReportType]: string } = {
    [ReportType.OperatorsWorkingReport]: 'Отчет по операторам',
  };

  return types[type];
}

export const reportTypeTitleNames = Object.keys(ReportType).map((key) =>
  getReportTypeTitleName(key as ReportType)
);
