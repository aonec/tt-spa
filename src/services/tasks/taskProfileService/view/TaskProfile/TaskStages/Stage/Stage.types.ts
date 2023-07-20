import { StageListResponse } from 'api/myApi';

export type StageProps = {
  stage: StageListResponse;
  isLast: boolean;
  isShowRevertStageButton: boolean;
  handleRevertStage: () => void;
  isRevertStageLoading: boolean;
};
