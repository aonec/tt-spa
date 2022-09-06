import { EStageActionType } from 'myApi';
import { TaskActionsComponent } from './TaskActionsPanel.types';
import { AddPerpetratorContainer } from './addPerpetratorService';
import { EmailNotifyContainer } from './emailNotifyService';

export const taskActionsComponents: TaskActionsComponent[] = [
  {
    actionType: EStageActionType.AddPerpetrator,
    Component: AddPerpetratorContainer,
  },
  {
    actionType: EStageActionType.EmailNotify,
    Component: EmailNotifyContainer,
  },
];
