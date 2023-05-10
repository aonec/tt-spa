import { ApartmentResponse, HomeownerAccountListResponse } from 'myApi';

export type SplitPersonalNumberPageProps = {
  stageNumber: number;
  apartment: ApartmentResponse | null;
  homeowner: HomeownerAccountListResponse | undefined;
};
