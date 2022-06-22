import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  TaskListResponse,
} from 'myApi';
import { SeacrhTasksForm } from '../SearchTasks/SearchTasks.types';

export type TasksProfileProps = {
  handleExportTasksList: () => void;
  grouptype: string;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  handleSearch: (formFilter: SeacrhTasksForm) => void;
  observingTasksCount: number;
  executingTasksCount: number;
  tasks?: TaskListResponse[] | null;
};
