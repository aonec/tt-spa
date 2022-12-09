import { EResourceType } from 'myApi';
import {
  ConsumptionDataFilter,
  HousingConsumptionDataForTwoMonth,
  AddressWithSearchString,
  PreparedHouseManagements,
  GetConsumptionDataFilter,
  ResourceConsumptionGraphType,
} from '../../resourceConsumptionService.types';

export type ResourceConsumptionProfileProps = {
  isLoading: boolean;
  resourceConsumptionFilter: Partial<ConsumptionDataFilter> | null;
  setFilter: (filter: GetConsumptionDataFilter) => void;
  setResource: (resource: EResourceType) => void;
  housingConsumptionData: HousingConsumptionDataForTwoMonth | null;
  streetsList: AddressWithSearchString[];
  selectedHouseManagement: string;
  setHouseManagement: (houseManagement: string) => void;
  houseManagements: PreparedHouseManagements[];
  handleClearData: () => void;
};

export type BooleanTypesOfResourceConsumptionGraph = {
  [key in ResourceConsumptionGraphType]: boolean;
};
