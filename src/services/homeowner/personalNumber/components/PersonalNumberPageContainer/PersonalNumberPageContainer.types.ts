import { ApartmentResponse, } from 'myApi';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';

export type PersonalNumberPageContainerProps = {
  type: PersonalNumberActions;
  isLoading?: boolean;
  titleText: string;
  formId: string;
  apartment?: ApartmentResponse | null;
  cancelButtonText?: string;
  saveButtonText?: string;
  onCancelHandler?(): void;
  isLastStage?: boolean
};
