import { HomeownerAccountListResponse } from 'myApi';

export type SwitchStageProps = {
  homeowner: HomeownerAccountListResponse | undefined;
  formId: string;
};
