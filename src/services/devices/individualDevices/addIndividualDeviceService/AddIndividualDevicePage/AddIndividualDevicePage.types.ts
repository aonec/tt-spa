import {
  ApartmentResponse,
  ContractorListResponse,
  CreateIndividualDeviceRequest,
  IndividualDeviceListResponseFromDevicePagePagedList,
  IndividualDeviceMountPlaceListResponse,
} from 'myApi';

export type AddIndividualDevicePageProps = {
  stageNumber: number;
  handleGoPrevStage: () => void;
  apartment: ApartmentResponse | null;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
  modelNames: string[] | null;
  contractors: ContractorListResponse[] | null;
  handleFetchSerialNumberForCheck: (payload: string) => string;
  isFetchSerialNumberLoading: boolean;
  serialNumberForChecking: IndividualDeviceListResponseFromDevicePagePagedList | null;
  handleSubmitForm: (payload: CreateIndividualDeviceRequest) => void;
  formsData: CreateIndividualDeviceRequest | null;
};
