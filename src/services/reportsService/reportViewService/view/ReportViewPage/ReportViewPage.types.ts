import {
  HouseManagementResponse,
  HouseManagementWithStreetsResponse,
  IndividualDevicesConstructedReportResponse,
} from 'myApi';
import { ReportType } from '../../../view/ReportsPage/ReportsPage.types';
import { ReportFiltrationFormValues } from '../../reportViewService.types';

export type ReportViewPageProps = {
  reportType: ReportType;
  existingCities: string[] | null;
  houseManagements: HouseManagementResponse[] | null;
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[];
  filtrationValues: ReportFiltrationFormValues;
  setFiltrationValues: (payload: ReportFiltrationFormValues) => void;
  isLoadingReport: boolean;
  individualDevicesReportData: IndividualDevicesConstructedReportResponse[];
};
