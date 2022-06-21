import { EManagingFirmTaskFilterType } from 'myApi';

export type SearchTasksProps = {
  onSubmit: () => void;
};

export type SeacrhTasksForm = {
  taskType?: string;
  taskId?: number;
};

export const TasksFilterTypeDictionary = {
};
