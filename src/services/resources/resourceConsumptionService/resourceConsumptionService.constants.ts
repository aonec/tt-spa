import { BooleanTypesOfResourceConsumptionGraphForTwoMonth } from './view/ResourceConsumptionProfile/ResourceConsumptionProfile.types';

export const initialSelectedGraphTypes: BooleanTypesOfResourceConsumptionGraphForTwoMonth =
  {
    currentMonthData: {
      housing: true,
      normative: true,
      subscriber: true,
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
