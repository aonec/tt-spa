import { TaskShortResponse } from 'myApi';
import { getHousingStockTaskType } from '../../TasksMapsNative/TasksMapsNative.utils';
import { HousingStockTaskMarkerType } from '../../TasksMapsNative/TasksMapsNative.types';
import {
  AllResourcesIcon,
  CalculatorIcon,
  ColdWaterSupplyIcon,
  ElectricityIcon,
  HeatIcon,
  HotWaterSupplyIcon,
  WarningIcon,
} from 'ui-kit/icons';

export const getTaskIconByTaskType = (task: TaskShortResponse) => {
  const taskType = getHousingStockTaskType(task);

  switch (taskType) {
    case HousingStockTaskMarkerType.Calculator:
      return CalculatorIcon;
    case HousingStockTaskMarkerType.AllResources:
      return AllResourcesIcon;
    case HousingStockTaskMarkerType.Application:
      return WarningIcon;
    case HousingStockTaskMarkerType.ColdWaterSupply:
      return ColdWaterSupplyIcon;
    case HousingStockTaskMarkerType.Electricity:
      return ElectricityIcon;
    case HousingStockTaskMarkerType.Heat:
      return HeatIcon;
    case HousingStockTaskMarkerType.HotWaterSupply:
      return HotWaterSupplyIcon;
    default:
      return AllResourcesIcon;
  }
};
