import { HousingStockWithTasksResponse } from 'myApi';

export type TasksMapProps = {
  housingStocksWithTasks: HousingStockWithTasksResponse[];
  handleClickMarker: (payload: HousingStockWithTasksResponse) => void;
};

export enum HousingStockTaskMarkerType {
  Calculator = 'Calculator',
  AllResources = 'AllResources',
  ColdWaterSupply = 'ColdWaterSupply',
  HotWaterSupply = 'HotWaterSupply',
  Heat = 'Heat',
  Electricity = 'Electricity',
}
