import { ETasksState } from 'api/types';

export const TasksStateBackgroundLookup: {
  [key in ETasksState]: string;
} = {
  [ETasksState.OnTime]: '#17B45A',
  [ETasksState.MissedDeadline]: '#FF8C68',
  [ETasksState.NoTasks]: '#FFFFFF',
};

export const TasksStateNamesLookup: {
  [key in ETasksState]: string;
} = {
  [ETasksState.OnTime]: 'Квартира с активной задачей',
  [ETasksState.MissedDeadline]: 'Квартира с просроченной задачей',
  [ETasksState.NoTasks]: 'Нет задач',
};
