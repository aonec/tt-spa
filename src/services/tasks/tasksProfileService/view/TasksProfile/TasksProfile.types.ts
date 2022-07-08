import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  TaskListResponse,
  TasksPagedList,
} from 'myApi';
import { GetTasksListRequestPayload } from '../../tasksProfileService.types';
import { SearchTasksForm } from '../SearchTasks/SearchTasks.types';

export type TasksProfileProps = {
  handleExportTasksList: () => void;
  grouptype: string;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  handleSearch: (formFilter: SearchTasksForm) => void;
  changePageNumber: (PageNumber: number) => void;
  tasks: TaskListResponse[];
  initialValues: GetTasksListRequestPayload;
  pagedTasks: TasksPagedList | null;
  isLoading: boolean;
};
