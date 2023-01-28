import { EResourceType } from 'myApi';
import {
  ConsumptionDataFilter,
  ConsumptionDataForTwoMonth,
  AddressWithSearchString,
  PreparedHouseManagements,
  GetConsumptionDataFilter,
  ResourceConsumptionGraphType,
  ResourceConsumptionGraphDataType,
  MonthConsumptionData,
} from '../../resourceConsumptionService.types';

export type ResourceConsumptionProfileProps = {
  isLoading: boolean;
  resourceConsumptionFilter: Partial<ConsumptionDataFilter> | null;
  setFilter: (filter: GetConsumptionDataFilter) => void;
  setResource: (resource: EResourceType) => void;
  housingConsumptionData: ConsumptionDataForTwoMonth | null;
  streetsList: AddressWithSearchString[];
  selectedHouseManagement: string | null;
  setHouseManagement: (houseManagement: string | null) => void;
  houseManagements: PreparedHouseManagements[];
  handleClearData: () => void;
  handleClearFilter: () => void;
  selectedGraphTypes: BooleanTypesOfResourceConsumptionGraphForTwoMonth;
  setSelectedGraphTypes: (
    selected: BooleanTypesOfResourceConsumptionGraphForTwoMonth
  ) => void;
  additionalConsumptionData: MonthConsumptionData | null;
  handleClearAdditionalAddress: () => void;
};

export type BooleanTypesOfResourceConsumptionGraphForTwoMonth = {
  [ResourceConsumptionGraphDataType.currentMonthData]: BooleanTypesOfResourceConsumptionGraph;
  [ResourceConsumptionGraphDataType.prevMonthData]: BooleanTypesOfResourceConsumptionGraph;
};

export type BooleanTypesOfResourceConsumptionGraph = {
  [key in ResourceConsumptionGraphType]: boolean;
};

export type SelectedAddresses = {
  currentAddress: boolean;
  addditionalAddress: boolean;
};
