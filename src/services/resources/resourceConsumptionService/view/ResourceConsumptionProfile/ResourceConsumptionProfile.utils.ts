import { ConsumptionDataForTwoMonth } from '../../resourceConsumptionService.types';
import { BooleanTypesOfResourceConsumptionGraph } from './ResourceConsumptionProfile.types';

export const getDisabledGraphTypes = (
  data: ConsumptionDataForTwoMonth
) => {
  return {
    currentMonthData: Object.entries(data.currentMonthData).reduce(
      (acc, [key, arr]) => ({ ...acc, [key]: arr.length === 0 }),
      {} as BooleanTypesOfResourceConsumptionGraph
    ),
    prevMonthData: Object.entries(data.prevMonthData).reduce(
      (acc, [key, arr]) => ({ ...acc, [key]: arr.length === 0 }),
      {} as BooleanTypesOfResourceConsumptionGraph
    ),
  };
};
