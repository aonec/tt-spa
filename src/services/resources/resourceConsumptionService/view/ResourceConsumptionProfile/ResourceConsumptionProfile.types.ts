import { EResourceType } from 'myApi';
import {
  HousingConsumptionDataFilter,
  HousingConsumptionDataForTwoMonth,
  AddressWithSearchString,
  PreparedHouseManagements,
  GetHousingConsumptionDataFilter,
} from '../../resourceConsumptionService.types';

export type ResourceConsumptionProfileProps = {
  isLoading: boolean;
  resourceConsumptionFilter: Partial<HousingConsumptionDataFilter> | null;
  setFilter: (filter: GetHousingConsumptionDataFilter) => void;
  setResource: (resource: EResourceType) => void;
  housingConsumptionData: HousingConsumptionDataForTwoMonth | null;
  streetsList: AddressWithSearchString[];
  selectedHouseManagement: string;
  setHouseManagement: (houseManagement: string) => void;
  houseManagements: PreparedHouseManagements[];
};
