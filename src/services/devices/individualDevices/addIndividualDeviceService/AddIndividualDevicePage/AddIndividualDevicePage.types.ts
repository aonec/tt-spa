import { ApartmentResponse } from 'myApi';

export type AddIndividualDevicePageProps = {
  stageNumber: number;
  handleGoSecondStage: () => void;
  handleGoFirstStage: () => void;
  apartment: ApartmentResponse | null;
};
