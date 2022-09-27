import { EStageActionType, StagePushRequest, TaskResponse } from 'myApi';
import { FC } from 'react';

export type TaskActionsPanelProps = {
  actions: EStageActionType[];
  taskType: string;
  handlePushStage: (payload: StagePushRequest) => void;
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
  taskType: string;
  Component: FC;
};
