import {
  ContractorListResponse,
  CreateIndividualDeviceRequest,
  IndividualDeviceListResponseFromDevicePagePagedList,
  IndividualDeviceMountPlaceListResponse,
} from 'api/types';

export type BaseInfoStageProps = {
  contractors: ContractorListResponse[] | null;
  modelNames: string[] | null;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
  handleFetchSerialNumberForCheck: (payload: string) => string;
  isFetchSerialNumberLoading: boolean;
  serialNumberForChecking: IndividualDeviceListResponseFromDevicePagePagedList | null;
  handleSubmitForm: (payload: CreateIndividualDeviceRequest) => void;
  apartmentId: number | undefined;
  formData: CreateIndividualDeviceRequest | null;
  handleFetchModels: (model: string) => void;
};
