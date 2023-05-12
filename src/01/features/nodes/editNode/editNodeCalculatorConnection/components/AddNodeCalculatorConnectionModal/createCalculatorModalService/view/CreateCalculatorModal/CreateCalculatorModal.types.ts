import { CreateCalculatorRequest } from 'myApi';

export type CreateCalculatorModalProps = {
  stepNumber: number;
  goPrevStep: () => void;
  handleSubmitForm: () => void;
  updatePayload: (payload: Partial<CreateCalculatorRequest>) => void;
  closeModal: () => void;
  isOpen: boolean;
  isLoading: boolean;
};
