import { TaskListResponse } from 'api/types';
import { Timeline } from 'ui-kit/shared/TimeLine/TimeLine.types';
import { Timer } from 'ui-kit/shared/Timer/Timer.types';

export type TasksListItemProps = {
  task: TaskType;
  isSelected?: boolean;
  toggleTaskCheckbox?: () => void;
};

export type TaskType = TaskListResponse & {
  timeline: Timeline | null;
  timer: Timer;
  showExecutor: boolean;
  formatedCreationTime: string;
};
