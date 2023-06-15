import { ApartmentResponse } from 'myApi';

export type AddIndividualDevicePageProps = {
  stageNumber: number;
  handleGoNextStage: () => void;
  handleGoPrevStage: () => void;
  apartment: ApartmentResponse | null;
};
