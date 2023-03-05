import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  HousingStockWithTasksResponse,
  TaskResponse,
} from 'myApi';
import { HousingStocksWithTasksFiltrationValues } from 'services/tasks/tasksMapService/tasksMapService.types';

export type TasksMapFiltrationProps = {
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  applyFilters: (
    payload: Partial<HousingStocksWithTasksFiltrationValues>,
  ) => void;
  filtrationValues: HousingStocksWithTasksFiltrationValues;
  resetFilters: () => void;
  isLoadingHousingStocksWithTasks: boolean;
  selectedHousingStock: HousingStockWithTasksResponse | null;
  clearSelectedHousingStock: () => void;
  task: TaskResponse | null;
  isLoadingTask: boolean;
  handleClickTask: (taskId: number) => void;
  clearTask: () => void;
};
