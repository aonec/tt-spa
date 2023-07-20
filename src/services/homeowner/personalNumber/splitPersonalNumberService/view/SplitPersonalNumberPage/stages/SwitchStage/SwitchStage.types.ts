import { HomeownerAccountListResponse } from 'api/types';
import { SwitchStage } from 'services/homeowner/personalNumber/splitPersonalNumberService/splitPersonalNumberService.types';

export type SwitchStageProps = {
  homeowner: HomeownerAccountListResponse | undefined;
  formId: string;
  handleSubmitSwitchStage: (payload: SwitchStage) => void;
  switchStageData: SwitchStage | null;
};
