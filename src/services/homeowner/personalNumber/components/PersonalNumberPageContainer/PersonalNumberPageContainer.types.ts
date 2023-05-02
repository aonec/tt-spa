import { ApartmentResponse, HomeownerAccountResponse } from 'myApi';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';

export type PersonalNumberPageContainerProps = {
  type: PersonalNumberActions;
  isLoading: boolean;
  titleText: string;
  formId: string;
  apartment: ApartmentResponse | null ;
  homeowner: HomeownerAccountResponse | null
  cancelButtonText?: string;
  saveButtonText?: string;
};
