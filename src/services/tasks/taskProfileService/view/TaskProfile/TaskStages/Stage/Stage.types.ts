import { StageListResponse } from 'myApi';

export type StageProps = {
  stage: StageListResponse;
  isLast: boolean;
  isShowRevertStageButton: boolean;
  handleRevertStage: () => void;
  isRevertStageLoading: boolean;
};
