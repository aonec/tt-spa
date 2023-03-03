import { EManagingFirmTaskFilterTypeNullableStringDictionaryItem } from 'myApi';
import { HousingStocksWithTasksFiltrationValues } from 'services/tasks/tasksMapService/tasksMapService.types';

export type TasksMapFiltrationProps = {
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  applyFilters: (
    payload: Partial<HousingStocksWithTasksFiltrationValues>,
  ) => void;
  filtrationValues: HousingStocksWithTasksFiltrationValues;
  resetFilters: () => void;
  isLoadingHousingStocksWithTasks: boolean;
};
