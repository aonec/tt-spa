import { ApartmentResponse, HomeownerAccountListResponse } from 'myApi';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';

export type PersonalNumberPageContainerProps = {
  type: PersonalNumberActions;
  isLoading: boolean;
  titleText: string;
  formId: string;
  apartment?: ApartmentResponse | null;
  homeowner?: HomeownerAccountListResponse | null;
  cancelButtonText?: string;
  saveButtonText?: string;
};
