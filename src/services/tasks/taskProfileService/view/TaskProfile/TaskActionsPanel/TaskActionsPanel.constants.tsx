import { EStageActionType } from 'myApi';
import {
  TaskActionsComponent,
  TaskPanelComponentsGroupsName,
  TaskPanelComponentAdditionalType,
  TaskPanelInputPositionType,
} from './TaskActionsPanel.types';
import { AddPerpetratorContainer } from './addPerpetratorService';
import { EmailNotifyContainer } from './emailNotifyService';
import { AttachDocument } from './AttachDocument';
import { SwitchStageSelectContainer } from './switchStageSelectService';

export const taskActionsComponents: TaskActionsComponent[] = [
  {
    actionType: EStageActionType.AddPerpetrator,
    Component: AddPerpetratorContainer,
    position: TaskPanelInputPositionType.Middle,
  },
  {
    actionType: EStageActionType.EmailNotify,
    Component: EmailNotifyContainer,
    position: TaskPanelInputPositionType.Middle,
    type: TaskPanelComponentAdditionalType.ContractorSelect,
  },
  {
    actionType: EStageActionType.EmailNotify,
    Component: EmailNotifyContainer,
    position: TaskPanelInputPositionType.Full,
    type: TaskPanelComponentAdditionalType.MailText,
  },
  {
    actionType: EStageActionType.AddEmailTemplate,
    Component: AttachDocument,
    position: TaskPanelInputPositionType.Bottom,
    type: TaskPanelComponentAdditionalType.EmailTemplate,
  },
  {
    actionType: EStageActionType.AddDocuments,
    Component: AttachDocument,
    position: TaskPanelInputPositionType.Bottom,
  },
  {
    actionType: EStageActionType.Switch,
    Component: SwitchStageSelectContainer,
    position: TaskPanelInputPositionType.Middle,
  },
];

export const actionComponentPositionNamesDictionary: {
  [key in TaskPanelInputPositionType]: TaskPanelComponentsGroupsName;
} = {
  [TaskPanelInputPositionType.Middle]: 'halfSizeActions',
  [TaskPanelInputPositionType.Full]: 'fullSizeActions',
  [TaskPanelInputPositionType.Bottom]: 'bottomActions',
};
