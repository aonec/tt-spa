import { StageListResponse } from 'myApi';

export type TaskStagesProps = {
  stages: StageListResponse[];
  handleRevertStage: () => void;
  isRevertStageLoading: boolean;
  isPerpetrator: boolean;
};
