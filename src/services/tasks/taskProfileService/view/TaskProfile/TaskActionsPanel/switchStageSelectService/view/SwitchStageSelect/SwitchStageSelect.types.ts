import { StageListResponse } from 'api/types';

export type SwitchStageSelectProps = {
  nextStages: StageListResponse[];
  handleChange: (nextStageId: number) => void;
};
