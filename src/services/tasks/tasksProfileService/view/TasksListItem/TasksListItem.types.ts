import { TaskListResponse } from 'api/types';
import { Timeline } from 'ui-kit/sharedComponents/TimeLine/TimeLine.types';
import { Timer } from 'ui-kit/sharedComponents/Timer/Timer.types';

export type TasksListItemProps = {
  task: TaskType;
};

export type TaskType = TaskListResponse & {
  timeline: Timeline | null;
  timer: Timer;
  showExecutor: boolean;
  formatedCreationTime: string;
};
