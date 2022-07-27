import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
  TaskGroupingFilter,
  TaskListResponse,
  TasksPagedList,
} from 'myApi';
import { perpetratorItemsProps } from 'services/tasks/taskTypesService/taskTypesService.types';
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
  isExtendedSearchOpen: boolean;
  closeExtendedSearch: () => void;
  openExtendedSearch: () => void;
  clearFilters: () => void;
  changeFiltersByGroupType: (payload: TaskGroupingFilter) => TaskGroupingFilter;
  housingManagments: GuidStringDictionaryItem[] | null;
  perpetrators: perpetratorItemsProps[] | null;
  streets: string[];
  cities: string[] | null;
};
