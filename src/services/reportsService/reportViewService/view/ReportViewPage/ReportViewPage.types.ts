import {
  HouseManagementResponse,
  HouseManagementWithStreetsResponse,
} from 'myApi';
import { ReportType } from '../../../view/ReportsPage/ReportsPage.types';
import { ReportFiltrationFormValues } from './ReportFiltrationForm/ReportFiltrationForm.types';

export type ReportViewPageProps = {
  reportType: ReportType;
  existingCities: string[] | null;
  houseManagements: HouseManagementResponse[] | null;
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[];
  filtrationValues: ReportFiltrationFormValues;
  setFiltrationValues: (payload: ReportFiltrationFormValues) => void;
};
