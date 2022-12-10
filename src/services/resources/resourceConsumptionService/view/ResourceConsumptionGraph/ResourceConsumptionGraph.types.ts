import { EResourceType } from 'myApi';
import {
  ConsumptionDataForTwoMonth,
  MonthConsumptionData,
  ResourceConsumptionGraphDataType,
} from '../../resourceConsumptionService.types';
import { BooleanTypesOfResourceConsumptionGraphForTwoMonth } from '../ResourceConsumptionProfile/ResourceConsumptionProfile.types';

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
};
