import { ETaskClosingStatus } from 'myApi';
import { OkIcon, TimerIcon, CloseIcon } from 'ui-kit/icons';
import { RedTimerIcon } from '../../../services/tasks/tasksProfileService/view/TasksListItem/TasksListItem.styled';

export const IconLookup = [
  { icon: ETaskClosingStatus.Properly, element: OkIcon },
  { icon: ETaskClosingStatus.Interrupted, element: CloseIcon },
  {
    icon: 'timer',
    element: TimerIcon,
  },
  { icon: 'redTimer', element: RedTimerIcon },
];
