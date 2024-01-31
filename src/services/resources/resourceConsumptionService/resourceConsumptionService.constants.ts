import { BooleanTypesOfResourceConsumptionGraphForTwoMonth } from './view/ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export const initialSelectedGraphTypes: BooleanTypesOfResourceConsumptionGraphForTwoMonth =
  {
    currentMonthData: {
      housing: true,
      normative: false,
      subscriber: false,
    },
    prevMonthData: {
      housing: false,
      normative: false,
      subscriber: false,
    },
    additionalAddress: {
      housing: false,
      normative: false,
      subscriber: false,
    },
  };
