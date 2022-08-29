import { TimerClosingStatus } from 'ui-kit/shared_components/Timer/Timer.types';

export const LineColors: {
  [key in keyof typeof TimerClosingStatus]: string;
} = {
  [TimerClosingStatus.ClosedAutomatically]: '#f3f5f6',
  [TimerClosingStatus.Done]: '#17b45a',
  [TimerClosingStatus.Overdue]: '#fc525b',
};
