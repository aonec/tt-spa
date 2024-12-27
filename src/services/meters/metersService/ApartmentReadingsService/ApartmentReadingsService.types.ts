import {
  EOrderByRule,
  HomeownerAccountUpdateRequest,
  ApartmentUpdateRequest,
  HomeownerAccountRemovePhoneNumberRequest,
  HomeownerAccountAddPhoneNumberRequest,
  HomeownerAccountReplacePhoneNumberRequest,
} from 'api/types';

export type GetApartmentsRequestPayload = {
  ApartmentId?: number | null;
  City?: string | null;
  Street?: string | null;
  HousingStockNumber?: string | null;
  Corpus?: string | null;
  ApartmentNumber?: string | null;
  HousingStockId?: number | null;
  Question?: string | null;
  IndividualDeviceSerialNumber?: string | null;
  PageNumber?: number | null;
  PageSize?: number | null;
  OrderBy?: EOrderByRule | null;
  Skip?: number | null;
  Take?: number | null;
};

export type UpdateApartmentRequestPayload = ApartmentUpdateRequest & {
  apartmentId: number;
};

export type UpdateHomeownerRequestPayload = {
  id: string;
  data: HomeownerAccountUpdateRequest;
};

export type RemovePhoneNumberRequest =
  HomeownerAccountRemovePhoneNumberRequest & {
    id: string;
  };

export type AddPhoneNumberRequest = HomeownerAccountAddPhoneNumberRequest & {
  id: string;
};

export type ReplacePhoneNumberRequest =
  HomeownerAccountReplacePhoneNumberRequest & {
    id: string;
  };
