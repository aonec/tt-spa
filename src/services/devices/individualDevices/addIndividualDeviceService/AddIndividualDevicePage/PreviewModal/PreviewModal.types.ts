import {
  CreateIndividualDeviceRequest,
  IndividualDeviceMountPlaceListResponse,
} from 'myApi';
import { DocumentStageForm } from '../stages/DocumentsStage/DocumentsStage.types';

export type PreviewModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  isLoading: boolean;
  formData: CreateIndividualDeviceRequest | null;
  documents: DocumentStageForm | null;
  mountPlaces: IndividualDeviceMountPlaceListResponse[] | null;
  handleCreateDevice: () => void;
};
