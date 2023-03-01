import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  HousingStockWithTasksResponse,
} from 'myApi';

export type TasksMapViewProps = {
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  housingStocksWithTasks: HousingStockWithTasksResponse[];
};
