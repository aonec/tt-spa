import { ApartmentResponse, HomeownerAccountListResponse } from 'myApi';
import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';
import { Event } from 'effector';
import { SplitPersonalNumberSubmitData } from '../../splitPersonalNumberService/splitPersonalNumberService.types';

export type PersonalNumberFormProps = {
  type: PersonalNumberActions;
  formId: string;
  apartmentId?: number;
  isMainPersonalAccountNumber?: boolean;
  homeowner?: HomeownerAccountListResponse;
  setVisibleCloseHomeownerAccountModal?: (payload: boolean) => void;
  handleAddPersonalNumber?: (payload: PersonalNumberFormTypes) => void;
  handleEditHomeownerAccount?: (payload: PersonalNumberFormTypes) => void;
  handleSwitchHomeownerAccount?: (payload: {
    replaceableAccountId: string;
    form: PersonalNumberFormTypes;
  }) => void;
  handleSubmitSplit?: (payload: SplitPersonalNumberSubmitData) => void;
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
