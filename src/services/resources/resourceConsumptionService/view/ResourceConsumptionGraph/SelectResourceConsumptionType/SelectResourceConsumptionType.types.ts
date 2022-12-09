import { BooleanTypesOfResourceConsumptionGraph } from '../../ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export type SelectResourceConsumptionTypeProps = {
  disabled: {
    currentMonthData: BooleanTypesOfResourceConsumptionGraph;
    prevMonthData: BooleanTypesOfResourceConsumptionGraph;
  };
};
