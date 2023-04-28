import { HomeownerAccountCreateRequest } from 'myApi';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';

export type PersonalNumberFormProps = {
  type: PersonalNumberActions;
  formId: string;
  apartmentId: number;
  isMainPersonalAccountNumber?: boolean;
  handleAddPersonalNumber?: (payload: HomeownerAccountCreateRequest) => void;
};

export type PersonalNumberFormTypes = {
  name: string;
  phoneNumber: string;
  openAt: string;
  personalAccountNumber: string;
  paymentCode: string;
  isMainOnApartment: boolean;
};
