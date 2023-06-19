import {
  ContractorListResponse,
  CreateIndividualDeviceRequest,
  IndividualDeviceListResponseFromDevicePagePagedList,
  IndividualDeviceMountPlaceListResponse,
} from 'myApi';

export type BaseInfoStageProps = {
  contractors: ContractorListResponse[] | null;
  modelNames: string[] | null;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
  handleFetchSerialNumberForCheck: (payload: string) => string;
  isFetchSerialNumberLoading: boolean;
  serialNumberForChecking: IndividualDeviceListResponseFromDevicePagePagedList | null;
  handleSubmitForm: (payload: CreateIndividualDeviceRequest) => void;
  apartmentId: number | undefined;
};
