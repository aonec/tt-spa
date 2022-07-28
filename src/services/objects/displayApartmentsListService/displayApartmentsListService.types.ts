import { EOrderByRule } from '../../../api/types';
import { AddressSearchValues } from '../../addressSearchService/view/AddressSearch/AddressSearch.types';

export type GetApartmentsListRequestPayload = {
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
};

export type SearchApartmentsPayload = {
  pageNumber?: number;
} & AddressSearchValues;
