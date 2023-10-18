import { BooleanTypesOfResourceConsumptionGraph } from './ResourceConsumptionProfile.types';
import {
  MonthConsumptionData,
  ResourceConsumptionWithNull,
} from '../../resourceConsumptionService.types';

const getResourceConsumptionGraphData = (
  acc: BooleanTypesOfResourceConsumptionGraph,
  [key, arr]: [string, ResourceConsumptionWithNull[]],
) => ({ ...acc, [key]: arr?.length === 0 });

const getConsumptionByMonthData = (monthData?: MonthConsumptionData | null) => {
  return Object.entries(monthData || {}).reduce(
    getResourceConsumptionGraphData,
    {} as BooleanTypesOfResourceConsumptionGraph,
  );
};

export const getDisabledGraphTypes = (data: {
  currentMonthData?: MonthConsumptionData | undefined;
  prevMonthData?: MonthConsumptionData | undefined;
  additionalAddress: MonthConsumptionData | null;
}) => {
  return {
    currentMonthData: getConsumptionByMonthData(data.currentMonthData),
    prevMonthData: getConsumptionByMonthData(data.prevMonthData),
    additionalAddress: getConsumptionByMonthData(data.additionalAddress),
  };
};
