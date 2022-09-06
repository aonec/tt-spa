import { EStageActionType, StagePushRequest } from 'myApi';
import { FC } from 'react';

export type TaskActionsPanelProps = {
  actions: EStageActionType[];
  handlePushStage: (payload: StagePushRequest) => void;
};

export type TaskPanelInputSizeType = 'half' | 'full';

export type ActionComponentProps = {
  handleChange: (
    payload: StagePushRequest | ((prev: StagePushRequest) => StagePushRequest)
  ) => void;
};

export type TaskActionsComponent = {
  actionType: EStageActionType;
  Component: FC<ActionComponentProps>;
  size: TaskPanelInputSizeType;
};
