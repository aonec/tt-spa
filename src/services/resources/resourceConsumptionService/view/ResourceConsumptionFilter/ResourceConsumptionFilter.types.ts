import { GetAddressesRequestPayload } from 'services/objects/objectsProfileService/soiReportService/soiReportService.model.types';
import {
  HousingConsumptionDataFilter,
  GetHousingConsumptionDataFormik,
  AddressWithSearchString,
  PreparedHouseManagements,
} from '../../resourceConsumptionService.types';

export type ResourceConsumptionFilterProps = {
  setFilter: (filter: GetHousingConsumptionDataFormik) => void;
  filter: Partial<HousingConsumptionDataFilter> | null;
  streetsList: AddressWithSearchString[];
  selectedHouseManagement: string;
  setHouseManagement: (houseManagement: string) => void;
  houseManagements: PreparedHouseManagements[];
};
