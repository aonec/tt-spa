import moment from 'moment';

export enum ReportType {
  OperatorsWorkingReport = 'OperatorsWorkingReport',
  HouseManagementsReport = 'HouseManagementsReport',
  CallCenterWorkingReport = 'CallCenterWorkingReport',
  InspectorsWorkingReport = 'InspectorsWorkingReport',
  CheckingDatesReport = 'CheckingDatesReport',
  ClosedDevicesReport = 'ClosedDevicesReport',
}

export function getReportTypeTitleName(type: ReportType) {
  const types: { [K in ReportType]: string } = {
    [ReportType.OperatorsWorkingReport]: 'Отчет по операторам',
    [ReportType.HouseManagementsReport]: 'Сводный отчет принятых показаний',
    [ReportType.CallCenterWorkingReport]:
      'Еженедельный отчет по работе операторов',
    [ReportType.InspectorsWorkingReport]: 'Отчет по инспекторам',
    [ReportType.CheckingDatesReport]: 'Отчет по выходу поверки ИПУ',
    [ReportType.ClosedDevicesReport]: 'Отчет по закрытым приборам',
  };

  return types[type];
}

export const reportTypeTitleNames = Object.keys(ReportType).map((key) => ({
  name: getReportTypeTitleName(key as ReportType),
  type: key,
}));

export type RangePeriod = [moment.Moment | null, moment.Moment | null] | null;
