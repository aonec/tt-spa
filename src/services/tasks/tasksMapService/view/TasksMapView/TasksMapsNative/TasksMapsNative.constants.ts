import { HousingStockTaskMarkerType } from '../TasksMap/TasksMap.types';

export const TaskColorsDictionary: {
  [key in HousingStockTaskMarkerType]: string;
} = {
  [HousingStockTaskMarkerType.AllResources]: `#28305C`,
  [HousingStockTaskMarkerType.ColdWaterSupply]: '#79AFFF',
  [HousingStockTaskMarkerType.HotWaterSupply]: '#FF8C68',
  [HousingStockTaskMarkerType.Electricity]: '#E2B104',
  [HousingStockTaskMarkerType.Heat]: '#A269E9',
  [HousingStockTaskMarkerType.Calculator]: '#29E976',
};
