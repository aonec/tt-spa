import {
  MonthConsumptionData,
  ResourceConsumptionGraphType,
} from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';
import { BooleanTypesOfResourceConsumptionGraph } from '../../../ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export type SelectGraphTypeProps = {
  title: string;
  disabled: BooleanTypesOfResourceConsumptionGraph;
  checked: BooleanTypesOfResourceConsumptionGraph;
  handleSetChecked: (checked: BooleanTypesOfResourceConsumptionGraph) => void;
  colorConstructor: (type: ResourceConsumptionGraphType) => string;
  isHousingLoading?: boolean;
  isNormativeAndSubscriberLoading?: boolean;
  isPrevHousingLoading?: boolean;
  isPrevNormativeAndSubscriberLoading?: boolean;
  consumptionData?: MonthConsumptionData;
};
