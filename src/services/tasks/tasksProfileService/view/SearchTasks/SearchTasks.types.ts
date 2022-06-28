import {
  EManagingFirmTaskFilterType,
  EManagingFirmTaskFilterTypeNullableStringDictionaryItem,
} from 'myApi';
import { GetTasksListRequestPayload } from '../../tasksProfileService.types';

export type SearchTasksProps = {
  onSubmit: (formFilter: SearchTasksForm) => void;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
  currentFilter: GetTasksListRequestPayload | null;
};

export type SearchTasksForm = {
  TaskType?: EManagingFirmTaskFilterType | null;
  TaskId?: string;
};

export const TasksFilterTypeDictionary = {};
