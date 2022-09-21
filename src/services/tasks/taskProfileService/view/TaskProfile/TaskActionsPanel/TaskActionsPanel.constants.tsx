import { EManagingFirmTaskType, EStageActionType } from 'myApi';
import {
  TaskActionsComponent,
  TaskPanelComponentsGroupsName,
  TaskPanelComponentAdditionalType,
  TaskPanelInputPositionType,
  TaskActionPanelInfoComponent,
} from './TaskActionsPanel.types';
import { AddPerpetratorContainer } from './addPerpetratorService';
import { EmailNotifyContainer } from './emailNotifyService';
import { AttachDocument } from './AttachDocument';
import { SwitchStageSelectContainer } from './switchStageSelectService';
import { SetNextStageDeadlineDatepicker } from './SetNextStageDeadlineDatepicker';
import { IndividualDeviceCheckInfoContainer } from './SetNextStageDeadlineService/setNextStageDeadlineService.container';
import { CorrectionReadingsContainer } from './correctionReadingsService';
import { Comment } from './Comment';

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
  {
    actionType: EStageActionType.SetNextStageDeadline,
    Component: SetNextStageDeadlineDatepicker,
    position: TaskPanelInputPositionType.Middle,
  },
  {
    actionType: EStageActionType.FixReading,
    Component: CorrectionReadingsContainer,
    position: TaskPanelInputPositionType.Full,
  },
  {
    actionType: EStageActionType.AddComment,
    Component: Comment,
    position: TaskPanelInputPositionType.Full,
  },
];

export const taskActionInfoComppnents: TaskActionPanelInfoComponent[] = [
  {
    taskType: EManagingFirmTaskType.IndividualDeviceCheck,
    Component: IndividualDeviceCheckInfoContainer,
  },
];

export const actionComponentPositionNamesDictionary: {
  [key in TaskPanelInputPositionType]: TaskPanelComponentsGroupsName;
} = {
  [TaskPanelInputPositionType.Middle]: 'halfSizeActions',
  [TaskPanelInputPositionType.Full]: 'fullSizeActions',
  [TaskPanelInputPositionType.Bottom]: 'bottomActions',
};
