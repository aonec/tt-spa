import { EResourceType } from 'api/myApi';
import {
  ConsumptionDataForTwoMonth,
  MonthConsumptionData,
  ResourceConsumptionGraphDataType,
} from '../../resourceConsumptionService.types';
import {
  BooleanTypesOfResourceConsumptionGraphForTwoMonth,
  SelectedAddresses,
} from '../ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export type ResourceConsumptionGraphProps = {
  consumptionData:
    | (ConsumptionDataForTwoMonth & {
        [ResourceConsumptionGraphDataType.additionalAddress]: MonthConsumptionData | null;
      })
    | null;
  resource?: EResourceType;
  startOfMonth: string;
  checked: BooleanTypesOfResourceConsumptionGraphForTwoMonth;
  additionalConsumptionData: MonthConsumptionData | null;
  selectedAddresses: SelectedAddresses;
};
