import type { JSX } from 'react';
import {
  ChevronActiveIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from 'ui-kit/icons';
import { PanelItemStatus } from './PanelItem.types';
import { EPollState } from 'api/types';

export const PanelItemStatusIcon: { [key in PanelItemStatus]: JSX.Element } = {
  [PanelItemStatus.Error]: <XCircleIcon />,
  [PanelItemStatus.Success]: <ChevronActiveIcon />,
  [PanelItemStatus.Info]: <QuestionMarkCircleIcon />,
};

export const PollStateTextLookup: { [key in EPollState]: string } = {
  [EPollState.Done]: 'Готово',
  [EPollState.Error]: 'Ошибка',
  [EPollState.Pending]: 'Ожидает выполнения',
  [EPollState.Running]: 'Выполняется',
};

export const PollStateColorLookup: { [key in EPollState]: string } = {
  [EPollState.Done]: '#17B45A',
  [EPollState.Error]: '#FF8C68',
  [EPollState.Pending]: '#E2B104',
  [EPollState.Running]: '#79AFFF',
};
