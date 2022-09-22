import {
  EStageActionType,
  StagePushRequest,
  EManagingFirmTaskType,
} from 'myApi';
import { FC } from 'react';
import { PushStageRequestPayload } from 'services/tasks/taskProfileService/taskProfileService.types';

export type TaskActionsPanelProps = {
  actions: EStageActionType[];
  taskType: string;
  handlePushStage: (payload: PushStageRequestPayload) => void;
  isPushStageLoading: boolean;
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
    payload: StagePushRequest | ((prev: StagePushRequest) => StagePushRequest)
  ) => void;
  type?: TaskPanelComponentAdditionalType;
};

export type TaskActionsComponent = {
  actionType: EStageActionType;
  Component: FC<ActionComponentProps>;
  position: TaskPanelInputPositionType;
  type?: TaskPanelComponentAdditionalType;
  taskType?: string;
};

export type TaskActionPanelInfoComponent = {
  taskType: EManagingFirmTaskType;
  Component: FC;
};
