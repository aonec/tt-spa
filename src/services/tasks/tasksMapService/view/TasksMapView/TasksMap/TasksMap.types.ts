import { HousingStockWithTasksResponse } from 'myApi';

export type TasksMapProps = {
  housingStocksWithTasks: HousingStockWithTasksResponse[];
  handleClickMarker: (payload: HousingStockWithTasksResponse) => void;
};
