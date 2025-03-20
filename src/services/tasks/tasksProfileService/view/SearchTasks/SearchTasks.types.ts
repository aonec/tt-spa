import {
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
  OrganizationUserListResponse,
  TaskGroupingFilter,
} from 'api/types';
import { GetTasksListRequestPayload } from '../../tasksProfileService.types';

export type SearchTasksProps = {
  onSubmit: (formFilter: GetTasksListRequestPayload) => void;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  currentFilter: GetTasksListRequestPayload | null;
  isExtendedSearchOpen: boolean;
  closeExtendedSearch: () => void;
  openExtendedSearch: () => void;
  clearFilters: () => void;
  changeFiltersByGroupType: (payload: TaskGroupingFilter) => TaskGroupingFilter;
  housingManagments: GuidStringDictionaryItem[] | null;
  perpetrators: OrganizationUserListResponse[] | null;
  isControlMode: boolean;
};
