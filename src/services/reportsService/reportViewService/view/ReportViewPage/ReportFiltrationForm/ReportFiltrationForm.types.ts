import {
  HouseManagementResponse,
  HouseManagementWithStreetsResponse,
} from 'myApi';
import { ReportFiltrationFormValues } from 'services/reportsService/reportViewService/reportViewService.types';

export type ReportFiltrationFormProps = {
  existingCities: string[] | null;
  houseManagements: HouseManagementResponse[] | null;
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[];
  filtrationValues: ReportFiltrationFormValues;
  formId: string;
  setFiltrationValues: (payload: ReportFiltrationFormValues) => void;
};

export type Address = {
  id: number;
  addressString: string;
};