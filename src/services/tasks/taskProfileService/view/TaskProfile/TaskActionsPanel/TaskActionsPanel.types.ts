import { FC } from 'react';
import {
  EStageActionType,
  StagePushRequest,
  EManagingFirmTaskType,
} from 'myApi';

export type TaskActionsPanelProps = {
  actions: EStageActionType[];
  taskType: EManagingFirmTaskType;
  handlePushStage: () => void;
  isLoading: boolean;
  handleChangePushStagePayload: (
    payload: StagePushRequest | ((prev: StagePushRequest) => StagePushRequest)
  ) => void;
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
  taskType?: EManagingFirmTaskType;
};

export type TaskActionPanelInfoComponent = {
  taskType: EManagingFirmTaskType;
  action: EStageActionType;
  Component: FC;
};
