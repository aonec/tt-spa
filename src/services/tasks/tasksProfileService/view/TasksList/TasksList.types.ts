import { TaskType } from '../TasksListItem/TasksListItem.types';

export type TasksListProps = {
  tasks: TaskType[];
  selectedTasks?: number[];
  toggleTaskCheckbox?: (payload: number) => void;
};
