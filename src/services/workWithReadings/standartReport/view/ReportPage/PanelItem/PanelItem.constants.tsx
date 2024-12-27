import {
  ChevronActiveIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from 'ui-kit/icons';
import { PanelItemStatus } from './PanelItem.types';

export const PanelItemStatusIcon: { [key in PanelItemStatus]: JSX.Element } = {
  [PanelItemStatus.Error]: <XCircleIcon />,
  [PanelItemStatus.Success]: <ChevronActiveIcon />,
  [PanelItemStatus.Info]: <QuestionMarkCircleIcon />,
};
