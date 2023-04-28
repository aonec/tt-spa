import { PersonalNumberActions } from '../../selectPersonalNumberActionService/selectPersonalNumberActionService.types';

export type PersonalNumberFormProps = {
  type: PersonalNumberActions;
  isMainPersonalAccountNumber?: boolean;
};

export type PersonalNumberFormTypes = {
  name: null | string;
  phoneNumber: null | string;
  openAt: null | string;
  personalAccountNumber: null | string;
  paymentCode: null | number;
  isMainAccountingNumber: boolean;
};
