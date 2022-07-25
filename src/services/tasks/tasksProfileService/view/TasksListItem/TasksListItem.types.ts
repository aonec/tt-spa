import { ETaskClosingStatus, TaskListResponse } from 'myApi';
import { OkIcon, TimerIcon, XIcon } from 'ui-kit/icons';

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
  icon: string;
  statusDescription: string;
  diffTime?: string;
  stage?: Omit<Timeline, 'timelineStyle'> | null;
  executionTime?: string;
};

export const IconLookup = [
  { icon: ETaskClosingStatus.Properly, element: OkIcon },
  {
    icon: 'timer',
    element: TimerIcon,
  },
  { icon: ETaskClosingStatus.Interrupted, element: XIcon },
];
