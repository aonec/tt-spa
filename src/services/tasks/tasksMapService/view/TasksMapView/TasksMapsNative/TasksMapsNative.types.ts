import { HousingStockWithTasksResponse } from 'myApi';

export type TasksMapsNativeProps = {
  housingStocksWithTasks: HousingStockWithTasksResponse[];
  handleClickMarker: (payload: HousingStockWithTasksResponse) => void;
  selectedHousingStockId: number | undefined;
};
