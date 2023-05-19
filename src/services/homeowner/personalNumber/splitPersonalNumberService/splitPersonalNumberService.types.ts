import { EOrderByRule } from 'myApi';
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

export interface GetIndividualDeviceRequestParams {
  ApartmentId?: number | null;
  HousingStockId?: number | null;
  Resource?: string | null;
  LastReadingsMonth?: string | null;
  TakeReadings?: number | null;
  ApartmentIds?: number[] | null;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
}

export type CheckApartmentRequest = {
  housingStockId: number;
  apartmentNumber: string;
};
