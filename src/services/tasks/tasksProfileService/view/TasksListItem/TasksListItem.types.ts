import { TaskListResponse } from 'myApi';
import { Timeline } from 'ui-kit/shared_components/TimeLine/TimeLine.types';
import { Timer } from 'ui-kit/shared_components/Timer/Timer.types';

export type TasksListItemProps = {
  task: TaskType;
};

export type TaskType = TaskListResponse & {
  timeline: Timeline | null;
  timer: Timer;
  showExecutor: boolean;
  formatedCreationTime: string;
};