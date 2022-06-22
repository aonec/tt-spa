import { EManagingFirmTaskFilterTypeNullableStringDictionaryItem } from 'myApi';

export type SearchTasksProps = {
  onSubmit: (formFilter: SeacrhTasksForm) => void;
  taskTypes: EManagingFirmTaskFilterTypeNullableStringDictionaryItem[] | null;
};

export type SeacrhTasksForm = {
  taskType: string | null;
  taskId?: number;
};

export const TasksFilterTypeDictionary = {};
