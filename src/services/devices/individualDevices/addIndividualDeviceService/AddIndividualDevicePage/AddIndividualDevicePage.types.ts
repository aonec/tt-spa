import {
  ApartmentResponse,
  ContractorListResponse,
  CreateIndividualDeviceRequest,
  IndividualDeviceListResponseFromDevicePagePagedList,
  IndividualDeviceMountPlaceListResponse,
} from 'api/types';
import { DocumentStageForm } from './stages/DocumentsStage/DocumentsStage.types';

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
  formData: CreateIndividualDeviceRequest | null;
  documents: DocumentStageForm | null;
  handleSubmitDocumentStage: (payload: DocumentStageForm) => void;
  isDocumentUploadLoading: boolean;
  handleFetchModels: (model: string) => void;
};
