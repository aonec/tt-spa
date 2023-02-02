import { IndividualDevicesConstructedReportResponse } from 'myApi';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';

export type ReportViewTableProps = {
  reportType: ReportType;
  individualDevicesReportData: IndividualDevicesConstructedReportResponse[];
};
