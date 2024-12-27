import { EOrderByRule } from 'api/types';
import { AddressSearchValues } from 'services/addressSearchService/view/AddressSearch/AddressSearch.types';

export type GetApartmentsListRequestPayload = {
  City?: string | null;
  Street?: string | null;
  HousingStockNumber?: string | null;
  Corpus?: string | null;
  ApartmentNumber?: string | null;
  HousingStockId?: number;
  Question?: string | null;
  IndividualDeviceSerialNumber?: string;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};

export type SearchApartmentsPayload = {
  pageNumber?: number;
} & AddressSearchValues;
