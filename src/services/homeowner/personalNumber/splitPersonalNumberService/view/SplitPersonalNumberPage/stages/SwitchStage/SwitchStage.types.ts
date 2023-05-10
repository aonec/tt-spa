import { HomeownerAccountListResponse } from 'myApi';
import { SplitPersonalNumberSubmitData } from 'services/homeowner/personalNumber/splitPersonalNumberService/splitPersonalNumberService.types';

export type SwitchStageProps = {
  homeowner: HomeownerAccountListResponse | undefined;
  formId: string;
  handleSubmitSplitStage: (payload: SplitPersonalNumberSubmitData) => void;
};
