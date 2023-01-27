import { BooleanTypesOfResourceConsumptionGraphForTwoMonth } from './view/ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export const initialSelectedGraphTypes: BooleanTypesOfResourceConsumptionGraphForTwoMonth =
  {
    currentMonthData: {
      housing: true,
      normative: false,
      subscriber: false,
    },
    prevMonthData: {
      housing: true,
      normative: false,
      subscriber: false,
    },
  };
