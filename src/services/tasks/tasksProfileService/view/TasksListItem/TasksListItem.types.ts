import { TaskListResponse } from 'myApi';

export type TasksListItemProps = {
  task: TaskType;
};

export type TaskType = TaskListResponse & {
  timeline: Timeline | null;
  timer: Timer;
  showExecutor: boolean;
  formatedCreationTime: string;
};

export type Timeline = {
  deadlineDate: string;
  remainingTime: string;
  timelineStyle: {
    color: string;
    width: string;
  };
  isFailed?: boolean;
};

export type Timer = {
  stage: Omit<Timeline, 'timelineStyle'> | null;
  icon: string;
  statusDescription: string;
  diffTime?: string;
  executionTime?: string;
  isFailed?: boolean;
};
