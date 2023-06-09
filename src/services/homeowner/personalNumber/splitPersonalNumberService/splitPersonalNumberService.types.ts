import { PersonalNumberFormTypes } from '../components/PersonalNumberForm/PersonalNumberForm.types';

export type SwitchStage = {
  replaceableAccountId: string;
  form: PersonalNumberFormTypes;
};

export type AddNewApartmentStage = {
  personalAccountNumber: string;
  name: string;
  phoneNumber?: string | null;
  openAt: string;
  isMainOnApartment?: boolean;
  paymentCode?: string | null;
  apartmentId: number;
  isForced?: boolean | null;
  apartmentNumber: number;
};

export type TransferStage = { individualDeviceIdsForSwitch: number[] };
