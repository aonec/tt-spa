import { EIndividualDeviceReportOption, IndividualDevicesConstructedReportResponse } from 'myApi';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';

export type ReportViewTableProps = {
  reportType: ReportType;
  individualDevicesReportData: IndividualDevicesConstructedReportResponse[] | null;
  city: string | null;
  reportOption: EIndividualDeviceReportOption | null;
};