import { HousingStockWithTasksResponse } from 'myApi';

export type TasksMapsNativeProps = {
  housingStocksWithTasks: HousingStockWithTasksResponse[];
  handleClickMarker: (payload: HousingStockWithTasksResponse) => void;
  selectedHousingStockId: number | undefined;
};

export type DiagramData = {
  value: number;
  color: string;
};

export type DiagramConfig = {
  strokeWidth: number;
  radius: number;
  start: 'top' | 'left' | 'right' | 'bottom';
};

export interface SectorData extends DiagramData {
  width: number;
  offset: number;
}
