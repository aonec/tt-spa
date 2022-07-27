import { FormikErrors } from 'formik';
import {
  EManagingFirmTaskFilterType,
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
  GuidStringDictionaryItem,
  TaskGroupingFilter,
} from 'myApi';
import { perpetratorItemsProps } from 'services/tasks/taskTypesService/taskTypesService.types';
import { GetTasksListRequestPayload } from '../../tasksProfileService.types';

export type SearchTasksProps = {
  onSubmit: (formFilter: SearchTasksForm) => void;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  currentFilter: GetTasksListRequestPayload | null;
  isExtendedSearchOpen: boolean;
  closeExtendedSearch: () => void;
  openExtendedSearch: () => void;
  clearFilters: () => void;
  changeFiltersByGroupType: (payload: TaskGroupingFilter) => TaskGroupingFilter;
  housingManagments: GuidStringDictionaryItem[] | null;
  perpetrators: perpetratorItemsProps[] | null;
  streets: string[]
};

export type SearchTasksForm = {
  TaskType?: EManagingFirmTaskFilterType | null;
  TaskId?: string;
};

export const TasksFilterTypeDictionary = {};

export type ExtendedSearchTypes = {
  values: GetTasksListRequestPayload;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<GetTasksListRequestPayload>>;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  housingManagments?: GuidStringDictionaryItem[] | null;
  perpetrators?: perpetratorItemsProps[] | null;
  streets?: string[]
};

export type CategotyI = {
  Node: Partial<EManagingFirmTaskFilterType>[];
  All: Partial<EManagingFirmTaskFilterType>[];
  IndividualDevice: Partial<EManagingFirmTaskFilterType>[];
  HouseNetwork: Partial<EManagingFirmTaskFilterType>[];
};