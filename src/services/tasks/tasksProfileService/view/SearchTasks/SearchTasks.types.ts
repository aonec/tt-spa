import { FormikErrors } from 'formik';
import {
  EManagingFirmTaskFilterType,
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
};

export const TasksFilterTypeDictionary = {};

export type ExtendedSearchTypes = {
  values: GetTasksListRequestPayload;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<GetTasksListRequestPayload>>;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  housingManagments?: GuidStringDictionaryItem[] | null;
  perpetrators?: OrganizationUserListResponse[] | null;
};

export type taskCategotiesProps = {
  Node: Partial<EManagingFirmTaskFilterType>[];
  All: Partial<EManagingFirmTaskFilterType>[];
  IndividualDevice: Partial<EManagingFirmTaskFilterType>[];
  HouseNetwork: Partial<EManagingFirmTaskFilterType>[];
};
