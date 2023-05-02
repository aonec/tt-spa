import { HomeownerAccountCreateRequest } from 'myApi';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';

export type PersonalNumberFormProps = {
  type: PersonalNumberActions;
  formId: string;
  apartmentId?: number;
  isMainPersonalAccountNumber?: boolean;
  homeownerId?: number;
  handleAddPersonalNumber?: (payload: HomeownerAccountCreateRequest) => void;
  handleEditHomeownerAccount?: (payload: PersonalNumberFormTypes) => void;
};

export type PersonalNumberFormTypes = {
  name: string;
  phoneNumber: string;
  openAt: string;
  personalAccountNumber: string;
  paymentCode: string;
  isMainOnApartment: boolean;
  apartmentId?: number ;
  homeownerId?: number;
};
