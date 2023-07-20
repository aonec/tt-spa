import { ETasksState } from 'api/myApi';

export const TasksStateColorsLookup: {
  [key in ETasksState]: string;
} = {
  [ETasksState.OnTime]: '#FFFFFF',
  [ETasksState.MissedDeadline]: '#FFFFFF',
  [ETasksState.NoTasks]: '#272f5a',
};
