import {
  ApartmentActsConstructedReportResponse,
  EIndividualDeviceReportOption,
  HomeownersConstructedReportResponse,
  HousingDevicesConstructedReportResponse,
  IndividualDevicesConstructedReportResponse,
} from 'api/types';
import { EmployeeReportResponse } from 'services/reportsService/reportViewService/reportViewService.types';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';
import { EmployeeReportType } from '../ReportFiltrationForm/ReportFiltrationForm.types';

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
  emloyeeReportData: EmployeeReportResponse | null;
  employeeReportType: EmployeeReportType | null;
};

export type ReportAddress = {
  city: string | null;
  street: string | null;
  houseNumber: string | null;
  corpus: string | null;
  apartmentNumber?: string | null;
};
