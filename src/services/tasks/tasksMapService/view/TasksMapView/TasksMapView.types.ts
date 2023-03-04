import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  HousingStockWithTasksResponse,
  TaskResponse,
} from 'myApi';
import { HousingStocksWithTasksFiltrationValues } from '../../tasksMapService.types';

export type TasksMapViewProps = {
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  housingStocksWithTasks: HousingStockWithTasksResponse[];
  applyFilters: (
    payload: Partial<HousingStocksWithTasksFiltrationValues>,
  ) => void;
  filtrationValues: HousingStocksWithTasksFiltrationValues;
  resetFilters: () => void;
  isLoadingHousingStocksWithTasks: boolean;
  selectedHousingStock: HousingStockWithTasksResponse | null;
  handleClickMarker: (payload: HousingStockWithTasksResponse) => void;
  clearSelectedHousingStock: () => void;
  task: TaskResponse | null;
  isLoadingTask: boolean;
  handleClickTask: (taskId: number) => void;
};
