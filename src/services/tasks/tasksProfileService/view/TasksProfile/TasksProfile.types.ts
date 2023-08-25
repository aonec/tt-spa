import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
  OrganizationUserListResponse,
  TaskGroupingFilter,
  TasksPagedList,
} from 'api/types';
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
  perpetrators: OrganizationUserListResponse[];
  isSpectator: boolean;
  tasksPageSegment: TasksPageSegment;
  setTasksPageSegment: (segment: TasksPageSegment) => void;
  handleOpenAddTaskModal: () => void;
  isPermissionToAddTask: boolean;
};

export type TasksPageSegment = 'list' | 'map';
