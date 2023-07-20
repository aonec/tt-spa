import { EisTaskType } from 'api/types';

export type GetTaskDeadlineRequest = {
  WorkCategoryId?: string;
  TaskType?: EisTaskType;
  isPermittedToRequest: boolean;
};
