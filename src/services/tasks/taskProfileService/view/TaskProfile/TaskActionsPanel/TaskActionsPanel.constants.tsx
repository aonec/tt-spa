import { EManagingFirmTaskType, EStageActionType } from 'api/types';
import {
  TaskActionsComponent,
  TaskPanelComponentsGroupsName,
  TaskPanelComponentAdditionalType,
  TaskPanelInputPositionType,
  TaskActionPanelInfoComponent,
} from './TaskActionsPanel.types';
import { AddPerpetratorContainer } from './addPerpetratorService';
import { EmailNotifyContainer } from './emailNotifyService';
import { SwitchStageSelectContainer } from './switchStageSelectService';
import { CorrectionReadingsContainer } from './correctionReadingsService';
import { SwitchOrCompleteContainer } from './switchOrCompleteService';
import { InputReadings } from './InputReadings';
import { CompletionStageContainer } from './completionStageService';
import { IndividualDeviceCheckInfoContainer } from './infoComponents/SetNextStageDeadlineService';
import { SetNextStageDeadlineContainer } from './SetNextStageDeadlineService';
import { CloseDevicesContainer } from './CloseDeviceService';
import { CommentContainer } from './commentService';
import { AttachDocumentContainer } from './attachDocumentService';
import { SwitchDeviceContainer } from './switchDeviceService';
import { AddResourceDisconnectionContainer } from './addResourceDisconnectionService';
import { SetExecutionPostponedDateContainer } from './setExecutionPostponedDateService';
import { SelectApplicationWorkerContainer } from './selectApplicationWorkerService';

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
    Component: AttachDocumentContainer,
    position: TaskPanelInputPositionType.Bottom,
    type: TaskPanelComponentAdditionalType.EmailTemplate,
  },
  {
    actionType: EStageActionType.AddDocuments,
    Component: AttachDocumentContainer,
    position: TaskPanelInputPositionType.Bottom,
  },
  {
    actionType: EStageActionType.Switch,
    Component: SwitchStageSelectContainer,
    position: TaskPanelInputPositionType.Middle,
  },
  {
    actionType: EStageActionType.SetNextStageDeadline,
    Component: SetNextStageDeadlineContainer,
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
    actionType: EStageActionType.Completion,
    Component: CompletionStageContainer,
    position: TaskPanelInputPositionType.Full,
  },
  {
    actionType: EStageActionType.CreateResourceDisconnecting,
    Component: AddResourceDisconnectionContainer,
    position: TaskPanelInputPositionType.Full,
  },
  {
    actionType: EStageActionType.AddComment,
    Component: CommentContainer,
    position: TaskPanelInputPositionType.Full,
  },
  {
    actionType: EStageActionType.SwitchDevices,
    Component: SwitchDeviceContainer,
    position: TaskPanelInputPositionType.Full,
  },
  {
    actionType: EStageActionType.SetApplicationPostponeDate,
    Component: SetExecutionPostponedDateContainer,
    position: TaskPanelInputPositionType.Full,
  },
  {
    actionType: EStageActionType.SelectApplicationWorker,
    Component: SelectApplicationWorkerContainer,
    position: TaskPanelInputPositionType.Bottom,
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
