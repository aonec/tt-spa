import {
  BuildingWithTasksResponse,
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  OrganizationUserListResponse,
  TaskResponse,
} from 'api/types';
import { HousingStocksWithTasksFiltrationValues } from 'services/tasks/tasksMapService/tasksMapService.types';

export type TasksMapFiltrationProps = {
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  applyFilters: (payload: HousingStocksWithTasksFiltrationValues) => void;
  filtrationValues: HousingStocksWithTasksFiltrationValues;
  resetFilters: () => void;
  isLoadingHousingStocksWithTasks: boolean;
  selectedHousingStock: BuildingWithTasksResponse | null;
  clearSelectedHousingStock: () => void;
  task: TaskResponse | null;
  isLoadingTask: boolean;
  handleClickTask: (taskId: number) => void;
  clearTask: () => void;
  organizationUsers: OrganizationUserListResponse[];
  housingStocksWithTasks: BuildingWithTasksResponse[];
};
