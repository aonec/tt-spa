import { StageListResponse } from 'myApi';

export type SwitchStageSelectProps = {
  nextStages: StageListResponse[];
  handleChange: (nextStageId: number) => void;
};
