import { ETaskClosingStatus } from "myApi";
import { OkIcon, RedTimerIcon, TimerIcon, XIcon } from "ui-kit/icons";

export const IconLookup = [
    { icon: ETaskClosingStatus.Properly, element: OkIcon },
    { icon: ETaskClosingStatus.Interrupted, element: XIcon },
    {
      icon: 'timer',
      element: TimerIcon,
    },
    { icon: 'redTimer', element: RedTimerIcon },
  ];
  