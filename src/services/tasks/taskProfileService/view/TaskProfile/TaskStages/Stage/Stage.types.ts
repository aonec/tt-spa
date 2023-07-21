import { StageListResponse } from 'api/types';

export type StageProps = {
  stage: StageListResponse;
  isLast: boolean;
  isShowRevertStageButton: boolean;
  handleRevertStage: () => void;
  isRevertStageLoading: boolean;
};
