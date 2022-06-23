import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  TaskListResponse,
} from 'myApi';
import { SearchTasksForm } from '../SearchTasks/SearchTasks.types';

export type TasksProfileProps = {
  handleExportTasksList: () => void;
  grouptype: string;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  handleSearch: (formFilter: SearchTasksForm) => void;
  observingTasksCount: number;
  executingTasksCount: number;
  tasks?: TaskListResponse[] | null;
};
