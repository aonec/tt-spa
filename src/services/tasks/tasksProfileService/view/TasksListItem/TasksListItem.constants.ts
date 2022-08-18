import { ETaskClosingStatus } from 'myApi';
import { OkIcon, TimerIcon, XIcon } from 'ui-kit/icons';
import { RedTimerIcon } from './TasksListItem.styled';

export const IconLookup = [
  { icon: ETaskClosingStatus.Properly, element: OkIcon },
  { icon: ETaskClosingStatus.Interrupted, element: XIcon },
  {
    icon: 'timer',
    element: TimerIcon,
  },
  { icon: 'redTimer', element: RedTimerIcon },
];
