import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  HousingStockWithTasksResponse,
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
};
