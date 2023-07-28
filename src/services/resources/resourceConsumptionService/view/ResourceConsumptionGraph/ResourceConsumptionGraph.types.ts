import { EResourceType } from 'api/types';
import { ConsumptionDataForTwoMonth } from '../../resourceConsumptionService.types';
import {
  BooleanTypesOfResourceConsumptionGraphForTwoMonth,
  SelectedAddresses,
} from '../ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export type ResourceConsumptionGraphProps = {
  consumptionData: ConsumptionDataForTwoMonth | null;
  resource?: EResourceType;
  startOfMonth: string;
  checked: BooleanTypesOfResourceConsumptionGraphForTwoMonth;
  selectedAddresses: SelectedAddresses;
};
