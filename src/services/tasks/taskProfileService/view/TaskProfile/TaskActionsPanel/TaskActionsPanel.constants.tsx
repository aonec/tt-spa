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
import { CorrectionReadingsContainer } from './correctionReadingsService';
import { Comment } from './Comment';
import { SwitchOrCompleteContainer } from './switchOrCompleteService';
import { InputReadings } from './InputReadings';
import { CloseDevicesContainer } from './closeDeviceService';
import { IndividualDeviceCheckInfoContainer } from './setNextStageDeadlineService';

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
    actionType: EStageActionType.CompletionOrSwitch,
    Component: SwitchOrCompleteContainer,
    position: TaskPanelInputPositionType.Full,
  },
  {
    actionType: EStageActionType.UploadReadings,
    Component: InputReadings,
    position: TaskPanelInputPositionType.Full,
  },
  {
    actionType: EStageActionType.CloseIndividualDevices,
    Component: CloseDevicesContainer,
    position: TaskPanelInputPositionType.Full,
  },
  {
    actionType: EStageActionType.AddComment,
    Component: Comment,
    position: TaskPanelInputPositionType.Full,
  },
];

export const taskActionInfoComponents: TaskActionPanelInfoComponent[] = [
  {
    taskType: EManagingFirmTaskType.IndividualDeviceCheck,
    action: EStageActionType.SetNextStageDeadline,
    Component: IndividualDeviceCheckInfoContainer,
  },
  {
    taskType: EManagingFirmTaskType.IndividualDeviceCheckNoReadings,
    action: EStageActionType.SetNextStageDeadline,
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
