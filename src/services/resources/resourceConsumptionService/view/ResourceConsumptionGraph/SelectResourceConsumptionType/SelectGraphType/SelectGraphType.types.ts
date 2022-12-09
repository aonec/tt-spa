import { ResourceConsumptionGraphType } from 'services/resources/resourceConsumptionService/resourceConsumptionService.types';
import { BooleanTypesOfResourceConsumptionGraph } from '../../../ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export type SelectGraphTypeProps = {
  title: string;
  colors: {
    [key in ResourceConsumptionGraphType]: string;
  };
  disabled: BooleanTypesOfResourceConsumptionGraph;
};
