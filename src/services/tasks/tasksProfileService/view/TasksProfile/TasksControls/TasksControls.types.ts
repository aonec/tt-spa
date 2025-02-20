import { TaskType } from '../../TasksListItem/TasksListItem.types';

export type Props = {
  selectedTasks: number[];
  setSelectedTasks: (payload: number[]) => void;
  tasks: TaskType[];
  handleCloseTasks: () => void;
};
