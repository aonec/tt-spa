import {
  ApartmentActsConstructedReportResponse,
  EIndividualDeviceReportOption,
  HousingDevicesConstructedReportResponse,
  IndividualDevicesConstructedReportResponse,
} from 'myApi';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';

export type ReportViewTableProps = {
  reportType: ReportType;
  individualDevicesReportData:
    | IndividualDevicesConstructedReportResponse[]
    | null;
  city: string | null;
  reportOption: EIndividualDeviceReportOption | null;
  actJournalReportData: ApartmentActsConstructedReportResponse | null;
  housingMeteringDevicesReportData:
    | HousingDevicesConstructedReportResponse[]
    | null;
};

export type ReportAddress = {
  city: string | null;
  street: string | null;
  houseNumber: string | null;
  corpus: string | null;
  apartmentNumber: string | null;
};
