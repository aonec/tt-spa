import { EStageActionType, StagePushRequest } from 'myApi';
import { FC } from 'react';

export type TaskActionsPanelProps = {
  actions: EStageActionType[];
  handlePushStage: (payload: StagePushRequest) => void;
};

export type TaskActionsComponent = {
  actionType: EStageActionType;
  Component: FC<{ handleChange?: (payload: StagePushRequest) => void }>;
};
