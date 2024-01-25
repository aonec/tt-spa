import {
  EResourceType,
  GetSummaryHousingConsumptionsByResourcesResponse,
} from 'api/types';
import { ConsumptionDataFilter } from '../../resourceConsumptionFilterService/resourceConsumptionFilterService.types';
import {
  ResourceConsumptionGraphType,
  ResourceConsumptionGraphDataType,
  MonthConsumptionData,
} from '../../resourceConsumptionService.types';

export type ResourceConsumptionProfileProps = {
  isLoading: boolean;
  resourceConsumptionFilter: ConsumptionDataFilter;
  setResource: (resource: EResourceType) => void;
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
  housingConsumptionData: {
    [ResourceConsumptionGraphDataType.currentMonthData]?: MonthConsumptionData;
    [ResourceConsumptionGraphDataType.prevMonthData]?: MonthConsumptionData;
    [ResourceConsumptionGraphDataType.additionalAddress]: MonthConsumptionData | null;
  };
  dynamicMinMax: [number, number];
  isOnlyHousingDataEmpty: boolean;
};

export type BooleanTypesOfResourceConsumptionGraphForTwoMonth = {
  [ResourceConsumptionGraphDataType.currentMonthData]: BooleanTypesOfResourceConsumptionGraph;
  [ResourceConsumptionGraphDataType.prevMonthData]: BooleanTypesOfResourceConsumptionGraph;
  [ResourceConsumptionGraphDataType.additionalAddress]: BooleanTypesOfResourceConsumptionGraph;
};

export type BooleanTypesOfResourceConsumptionGraph = {
  [key in ResourceConsumptionGraphType]: boolean;
};

export type SelectedAddresses = {
  currentAddress: boolean;
  additionalAddress: boolean;
};
