import {
  ContractorListResponse,
  IndividualDeviceMountPlaceListResponse,
} from 'myApi';

export type BaseInfoStageProps = {
  contractors: ContractorListResponse[] | null;
  modelNames: string[] | null;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
};
