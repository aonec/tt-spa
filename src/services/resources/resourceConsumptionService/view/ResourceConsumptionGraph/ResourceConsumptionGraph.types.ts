import { EResourceType } from 'api/types';
import {
  MonthConsumptionData,
  ResourceConsumptionGraphDataType,
} from '../../resourceConsumptionService.types';
import {
  BooleanTypesOfResourceConsumptionGraphForTwoMonth,
  SelectedAddresses,
} from '../ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export type ResourceConsumptionGraphProps = {
  resource: EResourceType;
  resourceForColor: EResourceType;
  startOfMonth: string;
  checked: BooleanTypesOfResourceConsumptionGraphForTwoMonth;
  selectedAddresses: SelectedAddresses;
  isAdditionalAddressSelected: boolean;
  consumptionData: {
    [ResourceConsumptionGraphDataType.currentMonthData]?: MonthConsumptionData;
    [ResourceConsumptionGraphDataType.prevMonthData]?: MonthConsumptionData;
    [ResourceConsumptionGraphDataType.additionalAddress]: MonthConsumptionData | null;
  };
  dynamicMinMax: [number, number];
  isAllDataAreLoading: boolean;
  isDataAreLoading: boolean;
};
