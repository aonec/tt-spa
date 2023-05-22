import { CreateCalculatorRequest } from 'myApi';
import { CreateCalculatorFiles } from './CreateCalculatorModalFilesUploadForm/CreateCalculatorModalFilesUploadForm.types';

export type CreateCalculatorModalProps = {
  stepNumber: number;
  goPrevStep: () => void;
  handleSubmitForm: () => void;
  updatePayload: (payload: CreateCalculatorPayload) => void;
  closeModal: () => void;
  isOpen: boolean;
  isLoading: boolean;
  payload: CreateCalculatorPayload;
};

export type CreateCalculatorPayload = Partial<CreateCalculatorRequest> &
  CreateCalculatorFiles;
