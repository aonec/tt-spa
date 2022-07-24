import { TaskListResponse } from 'myApi';
import { OkIcon, TimerIcon, XIcon } from 'ui-kit/icons';

export type TasksListItemProps = {
  task: TaskType;
};

export type TaskType = TaskListResponse & {
  timeline: Timeline;
  timer: Timer;
  showExecutor: boolean;
  calendar: string;
};

export type Timeline = {
  before: string;
  timeStr: string;
  style: {
    background: string;
    width: string;
  };
  fail?: boolean;
};

export type Timer = {
  icon: string;
  diff?: {
    timeStr: string;
  };
  stage?: Timeline | null;
  text?: string;
  final: Omit<Timeline, 'style' | 'before'>;
};

export const IconLookup = [
  { key: 'ok', element: OkIcon },
  {
    key: 'timer',
    element: TimerIcon,
  },
  { key: 'x', element: XIcon },
];
