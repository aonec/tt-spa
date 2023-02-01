import {
  HouseManagementResponse,
  HouseManagementWithStreetsResponse,
} from 'myApi';
import { ReportType } from '../../../view/ReportsPage/ReportsPage.types';

export type ReportViewPageProps = {
  reportType: ReportType;
  existingCities: string[] | null;
  houseManagements: HouseManagementResponse[] | null;
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[];
};
