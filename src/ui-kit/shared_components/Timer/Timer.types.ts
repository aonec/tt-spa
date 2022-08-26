import { Timeline } from "../TimeLine/TimeLine.types";

export type TimerProps = {
  timer: Timer;
};

export type Timer = {
  stage: Omit<Timeline, 'timelineStyle'> | null;
  icon: string;
  statusDescription: string;
  diffTime?: string;
  executionTime?: string;
  closingStatus?: TimerClosingStatus;
};

export enum TimerClosingStatus {
  Overdue = 'var(--error)',
  ClosedAutomatically = 'var(--bg)',
  Done = 'var(--success)',
}
