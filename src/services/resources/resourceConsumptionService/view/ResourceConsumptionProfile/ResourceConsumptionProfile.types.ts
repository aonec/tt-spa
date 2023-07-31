import {
  EResourceType,
  GetSummaryHousingConsumptionsByResourcesResponse,
} from 'api/types';
import { ConsumptionDataFilter } from '../../resourceConsumptionFilterService/resourceConsumptionFilterService.types';
import {
  ConsumptionDataForTwoMonth,
  ResourceConsumptionGraphType,
  ResourceConsumptionGraphDataType,
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
  summaryConsumption: GetSummaryHousingConsumptionsByResourcesResponse | null;
  resource: EResourceType;
  isSummaryLoading: boolean;
  isPrevNormativeAndSubscriberLoading: boolean;
  isPrevHousingLoading: boolean;
  isNormativeAndSubscriberLoading: boolean;
  isHousingLoading: boolean;
  isAdditionalAddressSelected: boolean;
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
  additionalAddress: boolean;
};
