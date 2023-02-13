import {
  ApartmentActsConstructedReportResponse,
  EIndividualDeviceReportOption,
  HomeownersConstructedReportResponse,
  HousingDevicesConstructedReportResponse,
  IndividualDevicesConstructedReportResponse,
} from 'myApi';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';

export type ReportViewTableProps = {
  reportType: ReportType;
  individualDevicesReportData:
    | IndividualDevicesConstructedReportResponse[]
    | null;
  reportOption: EIndividualDeviceReportOption | null;
  actJournalReportData: ApartmentActsConstructedReportResponse | null;
  housingMeteringDevicesReportData:
    | HousingDevicesConstructedReportResponse[]
    | null;
  homeownersReportData: HomeownersConstructedReportResponse[] | null;
};

export type ReportAddress = {
  city: string | null;
  street: string | null;
  houseNumber: string | null;
  corpus: string | null;
  apartmentNumber?: string | null;
};
