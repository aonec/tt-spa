import { GetAddressesRequestPayload } from 'services/objects/objectsProfileService/soiReportService/soiReportService.model.types';
import {
  HousingConsumptionDataFilter,
  GetHousingConsumptionDataFilter,
  AddressWithSearchString,
  PreparedHouseManagements,
} from '../../resourceConsumptionService.types';

export type ResourceConsumptionFilterProps = {
  setFilter: (filter: GetHousingConsumptionDataFilter) => void;
  filter: Partial<HousingConsumptionDataFilter> | null;
  streetsList: AddressWithSearchString[];
  selectedHouseManagement: string;
  setHouseManagement: (houseManagement: string) => void;
  houseManagements: PreparedHouseManagements[];
};

export type GetHousingConsumptionDataFormik = {
  HousingStockId: number | null;
  From: string;
};
