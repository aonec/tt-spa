import { ApartmentResponse } from 'myApi';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';

export type PersonalNumberPageContainerProps = {
  type: PersonalNumberActions;
  apartment: ApartmentResponse | null;
  isLoading: boolean;
  titleText: string;
  formId: string;
  cancelButtonText?: string;
  saveButtonText?: string;
};
