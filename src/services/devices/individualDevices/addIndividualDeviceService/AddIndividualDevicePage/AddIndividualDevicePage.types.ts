import {
  ApartmentResponse,
  ContractorListResponse,
  IndividualDeviceMountPlaceListResponse,
} from 'myApi';

export type AddIndividualDevicePageProps = {
  stageNumber: number;
  handleGoNextStage: () => void;
  handleGoPrevStage: () => void;
  apartment: ApartmentResponse | null;
  mountPlaces:   IndividualDeviceMountPlaceListResponse[] | null;
  modelNames: string[] | null;
  contractors: ContractorListResponse[] | null;
};
