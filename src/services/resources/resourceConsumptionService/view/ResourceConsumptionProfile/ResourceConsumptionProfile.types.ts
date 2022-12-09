import { EResourceType } from 'myApi';
import {
  ConsumptionDataFilter,
  ConsumptionDataForTwoMonth,
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
  housingConsumptionData: ConsumptionDataForTwoMonth | null;
  streetsList: AddressWithSearchString[];
  selectedHouseManagement: string;
  setHouseManagement: (houseManagement: string) => void;
  houseManagements: PreparedHouseManagements[];
  handleClearData: () => void;
  handleClearFilter: () => void;
  selectedGraphTypes: BooleanTypesOfResourceConsumptionGraphForTwoMonth;
  setSelectedGraphTypes: (
    selected: BooleanTypesOfResourceConsumptionGraphForTwoMonth
  ) => void;
};

export type BooleanTypesOfResourceConsumptionGraphForTwoMonth = {
  currentMonthData: BooleanTypesOfResourceConsumptionGraph;
  prevMonthData: BooleanTypesOfResourceConsumptionGraph;
};

export type BooleanTypesOfResourceConsumptionGraph = {
  [key in ResourceConsumptionGraphType]: boolean;
};
