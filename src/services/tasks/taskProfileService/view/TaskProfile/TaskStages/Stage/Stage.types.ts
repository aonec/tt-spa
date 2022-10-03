import { StageListResponse } from 'myApi';

export type StageProps = {
  stage: StageListResponse;
  isLast: boolean;
  isFirst: boolean;
  handleRevertStage: () => void;
  isRevertStageLoading: boolean;
};
