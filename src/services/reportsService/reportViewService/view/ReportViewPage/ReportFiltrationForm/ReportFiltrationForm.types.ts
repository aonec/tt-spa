import {
  HouseManagementResponse,
  HouseManagementWithStreetsResponse,
} from 'myApi';
import { ReportFiltrationFormValues } from 'services/reportsService/reportViewService/reportViewService.types';
import { ReportType } from 'services/reportsService/view/ReportsPage/ReportsPage.types';

export type ReportFiltrationFormProps = {
  existingCities: string[] | null;
  houseManagements: HouseManagementResponse[] | null;
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[];
  filtrationValues: ReportFiltrationFormValues;
  formId: string;
  setFiltrationValues: (payload: ReportFiltrationFormValues) => void;
  reportType: ReportType;
};

export type Address = {
  id: number;
  addressString: string;
};