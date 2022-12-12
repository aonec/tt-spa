import { StageListResponse } from 'myApi';

export type StageProps = {
  stage: StageListResponse;
  isLast: boolean;
  canRevertStage: boolean;
  handleRevertStage: () => void;
  isRevertStageLoading: boolean;
};
