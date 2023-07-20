import {
  BuildingWithTasksResponse,
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  OrganizationUserListResponse,
  TaskResponse,
} from 'myApi';
import { HousingStocksWithTasksFiltrationValues } from '../../tasksMapService.types';
import { OrganizationCoordinates } from 'services/currentUserService/currentUserService.types';

export type TasksMapViewProps = {
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  housingStocksWithTasks: BuildingWithTasksResponse[];
  applyFilters: (payload: HousingStocksWithTasksFiltrationValues) => void;
  filtrationValues: HousingStocksWithTasksFiltrationValues;
  resetFilters: () => void;
  isLoadingHousingStocksWithTasks: boolean;
  selectedHousingStock: BuildingWithTasksResponse | null;
  handleClickMarker: (payload: BuildingWithTasksResponse) => void;
  clearSelectedHousingStock: () => void;
  task: TaskResponse | null;
  isLoadingTask: boolean;
  handleClickTask: (taskId: number) => void;
  clearTask: () => void;
  organizationUsers: OrganizationUserListResponse[];
  organizationCoordinates: OrganizationCoordinates | null;
};
