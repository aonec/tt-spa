import { EOrderByRule } from 'api/myApi';
import { ApartmentUpdateRequest } from 'api/myApi';

export type GetApartmentsRequestPayload = {
  ApartmentId?: number;
  City?: string;
  Street?: string;
  HousingStockNumber?: string;
  Corpus?: string;
  ApartmentNumber?: string;
  HousingStockId?: number;
  Question?: string;
  IndividualDeviceSerialNumber?: string;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
};

export type UpdateApartmentRequestPayload = ApartmentUpdateRequest & {
  apartmentId: number;
};
