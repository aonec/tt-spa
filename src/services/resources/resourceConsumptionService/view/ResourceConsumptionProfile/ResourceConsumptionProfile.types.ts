import { EResourceType } from 'myApi';
import {
  HousingConsumptionDataFilter,
  GetHousingConsumptionDataFormik,
  HousingConsumptionDataForTwoMonth,
  AddressWithSearchString,
  PreparedHouseManagements,
} from '../../resourceConsumptionService.types';

export type ResourceConsumptionProfileProps = {
  isLoading: boolean;
  resourceConsumptionFilter: Partial<HousingConsumptionDataFilter> | null;
  setFilter: (filter: GetHousingConsumptionDataFormik) => void;
  setResource: (resource: EResourceType) => void;
  housingConsumptionData: HousingConsumptionDataForTwoMonth | null;
  streetsList: AddressWithSearchString[];
  selectedHouseManagement: string;
  setHouseManagement: (houseManagement: string) => void;
  houseManagements: PreparedHouseManagements[];
};
