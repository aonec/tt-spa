import {
  ApartmentActsConstructedReportResponse,
  HomeownersConstructedReportResponse,
  HouseManagementResponse,
  HouseManagementWithStreetsResponse,
  HousingDevicesConstructedReportResponse,
  IndividualDevicesConstructedReportResponse,
} from 'api/myApi';
import { ReportType } from '../../../view/ReportsPage/ReportsPage.types';
import {
  EmployeeReportResponse,
  ReportFiltrationFormValues,
} from '../../reportViewService.types';

export type ReportViewPageProps = {
  reportType: ReportType;
  existingCities: string[] | null;
  houseManagements: HouseManagementResponse[] | null;
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[];
  filtrationValues: ReportFiltrationFormValues;
  setFiltrationValues: (payload: ReportFiltrationFormValues) => void;
  isLoadingReport: boolean;
  individualDevicesReportData:
    | IndividualDevicesConstructedReportResponse[]
    | null;
  actJournalReportData: ApartmentActsConstructedReportResponse | null;
  housingMeteringDevicesReportData:
    | HousingDevicesConstructedReportResponse[]
    | null;
  homeownersReportData: HomeownersConstructedReportResponse[] | null;
  downloadReport: () => void;
  isReportFileDownloading: boolean;
  clearFiltrationValues: () => void;
  emloyeeReportData: EmployeeReportResponse | null;
};
