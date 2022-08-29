import { EStageActionType, StagePushRequest } from 'myApi';
import { FC } from 'react';

export type TaskActionsPanelProps = {
  actions: EStageActionType[];
  handlePushStage: (payload: StagePushRequest) => void;
};

export type TaskActionsComponent = {
  actionType: EStageActionType;
  component: FC<{ handleChange: (payload: StagePushRequest) => void }>;
};
