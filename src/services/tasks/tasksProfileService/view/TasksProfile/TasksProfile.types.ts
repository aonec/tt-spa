import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
  TaskGroupingFilter,
  TasksPagedList,
} from 'myApi';
import { perpetratorItemsProps } from 'services/tasks/taskTypesService/taskTypesService.types';
import { GetTasksListRequestPayload } from '../../tasksProfileService.types';
import { TaskType } from '../TasksListItem/TasksListItem.types';

export type TasksProfileProps = {
  handleExportTasksList: () => void;
  grouptype: string;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  handleSearch: (formFilter: GetTasksListRequestPayload) => void;
  changePageNumber: (PageNumber: number) => void;
  tasks: TaskType[];
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
  isSpectator: boolean;
};
