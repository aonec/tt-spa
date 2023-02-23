import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  TaskListResponse,
} from 'myApi';

export type TasksMapViewProps = {
  tasks: TaskListResponse[];
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
};
