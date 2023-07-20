import {
  EResourceType,
  GetSummaryHousingConsumptionsByResourcesResponse,
} from 'api/myApi';
import { ConsumptionDataFilter } from '../../resourceConsumptionFilterService/resourceConsumptionFilterService.types';
import {
  ConsumptionDataForTwoMonth,
  ResourceConsumptionGraphType,
  ResourceConsumptionGraphDataType,
  MonthConsumptionData,
} from '../../resourceConsumptionService.types';

export type ResourceConsumptionProfileProps = {
  isLoading: boolean;
  resourceConsumptionFilter: ConsumptionDataFilter;
  setResource: (resource: EResourceType) => void;
  housingConsumptionData: ConsumptionDataForTwoMonth | null;
  selectedGraphTypes: BooleanTypesOfResourceConsumptionGraphForTwoMonth;
  setSelectedGraphTypes: (
    selected: BooleanTypesOfResourceConsumptionGraphForTwoMonth,
  ) => void;
  additionalConsumptionData: MonthConsumptionData | null;
  summaryConsumption: GetSummaryHousingConsumptionsByResourcesResponse | null;
  resource: EResourceType;
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
