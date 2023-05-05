import { ApartmentResponse, HomeownerAccountListResponse } from 'myApi';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';
import { Event } from 'effector';

export type PersonalNumberFormProps = {
  type: PersonalNumberActions;
  formId: string;
  apartmentId?: number;
  isMainPersonalAccountNumber?: boolean;
  homeowner?: HomeownerAccountListResponse;
  setVisibleCloseHomeownerAccountModal?: (payload: boolean) => void;
  handleAddPersonalNumber?: (payload: PersonalNumberFormTypes) => void;
  handleEditHomeownerAccount?: (payload: PersonalNumberFormTypes) => void;
  handleSwitchHomeownerAccount?: (payload: PersonalNumberFormTypes) => void;
  handleForced?: Event<void>;
};

export type PersonalNumberFormTypes = {
  name: string;
  phoneNumber: string;
  openAt: string;
  personalAccountNumber: string;
  paymentCode: string;
  isMainOnApartment: boolean;
  apartmentId?: number;
  homeownerId?: string;
};
