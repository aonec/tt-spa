import {
  HouseManagementResponse,
  HouseManagementWithStreetsResponse,
  OrganizationResponsePagedList,
} from 'api/types';
import { ExportReportType } from 'services/reportsService/reportViewService/reportViewService.types';

export type Props = {
  existingCities: string[] | null;
  organizations: OrganizationResponsePagedList | null;
  houseManagements: HouseManagementResponse[] | null;
  addressesWithHouseManagements: HouseManagementWithStreetsResponse[];
  isOpen: boolean;
  setOpen: (payload: boolean) => void;
};

export type Form = {
  exportType: ExportReportType | null;
  city: null | string;
  organizationId: null | number;
  houseManagement: null | string;
  housingStockId: number | null;
};
