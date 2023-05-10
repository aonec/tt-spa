import { ApartmentResponse, HomeownerAccountListResponse } from 'myApi';
import { SplitPersonalNumberSubmitData } from '../../splitPersonalNumberService.types';

export type SplitPersonalNumberPageProps = {
  stageNumber: number;
  apartment: ApartmentResponse | null;
  homeowner: HomeownerAccountListResponse | undefined;
  handleSubmitSplit: (payload: SplitPersonalNumberSubmitData) => void;
};
