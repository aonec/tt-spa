import { EResourceType } from 'myApi';
import { ConsumptionDataForTwoMonth } from '../../resourceConsumptionService.types';
import { BooleanTypesOfResourceConsumptionGraphForTwoMonth } from '../ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export type ResourceConsumptionGraphProps = {
  consumptionData: ConsumptionDataForTwoMonth | null;
  resource?: EResourceType;
  startOfMonth: string;
  checked: BooleanTypesOfResourceConsumptionGraphForTwoMonth;
};
