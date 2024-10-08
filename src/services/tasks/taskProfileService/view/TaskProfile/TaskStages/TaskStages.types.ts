import { StageListResponse, TaskResponse } from 'api/types';

export type TaskStagesProps = {
  stages: StageListResponse[];
  handleRevertStage: () => void;
  isRevertStageLoading: boolean;
  isStageCanBeReverted: boolean;
  isEntryPoint: boolean;
  task: TaskResponse;
};
