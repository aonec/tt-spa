import { ETasksState } from 'api/types';

export const TasksStateColorsLookup: {
  [key in ETasksState]: string;
} = {
  [ETasksState.OnTime]: '#FFFFFF',
  [ETasksState.MissedDeadline]: '#FFFFFF',
  [ETasksState.NoTasks]: '#272f5a',
};
