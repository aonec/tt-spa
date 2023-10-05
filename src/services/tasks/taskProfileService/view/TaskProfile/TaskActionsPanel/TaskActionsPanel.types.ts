import { FC } from 'react';
import {
  EStageActionType,
  StagePushRequest,
  EManagingFirmTaskType,
  TaskResponse,
} from 'api/types';

export type TaskActionsPanelProps = {
  actions: EStageActionType[];
  task: TaskResponse;
  handlePushStage: () => void;
  isLoading: boolean;
  handleChangePushStagePayload: (
    payload: StagePushRequest | ((prev: StagePushRequest) => StagePushRequest),
  ) => void;
  pushStageRequestPayload: StagePushRequest;
};

export enum TaskPanelInputPositionType {
  Middle = 'Middle',
  Full = 'Full',
  Bottom = 'Bottom',
}

export type TaskPanelComponentsGroupsName =
  | 'halfSizeActions'
  | 'fullSizeActions'
  | 'bottomActions';

export enum TaskPanelComponentAdditionalType {
  MailText = 'MailText',
  ContractorSelect = 'ContractorSelect',
  EmailTemplate = 'EmailTemplate',
}

export type ActionComponentProps = {
  handleChange: (
    payload: StagePushRequest | ((prev: StagePushRequest) => StagePushRequest),
  ) => void;
  pushStageRequestPayload: StagePushRequest;
  task: TaskResponse;
};

export type TaskActionsComponent = {
  actionType: EStageActionType;
  Component: FC<ActionComponentProps>;
  position: TaskPanelInputPositionType;
  type?: TaskPanelComponentAdditionalType;
  taskType?: EManagingFirmTaskType;
};

export type TaskActionPanelInfoComponent = {
  taskType: EManagingFirmTaskType;
  action: EStageActionType;
  Component: FC;
};
