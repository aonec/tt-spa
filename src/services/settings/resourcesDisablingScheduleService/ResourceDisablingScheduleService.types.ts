import {
  EOrderByRule,
  EResourceDisconnectingOrderRule,
  EResourceDisconnectingStatus,
  EResourceDisconnectingType,
  EResourceType,
} from 'api/types';

export type DisablingResourcesFilters = Partial<{
  city: string;
  street: string;
  house: string;
  corpus: string;
  Resource: EResourceType;
  HouseManagementId: string;
  Sender: string;
  From: string;
  To: string;
  DisconnectingType: EResourceDisconnectingType;
  OrderRule: EResourceDisconnectingOrderRule;
  BuildingId: number;
  Status: EResourceDisconnectingStatus;
  PageNumber: number;
  PageSize: number;
  OrderBy: EOrderByRule;
  Skip: number;
  Take: number;
}>;

type FiltersWithoutAddress = Omit<
  DisablingResourcesFilters,
  'city' | 'street' | 'house' | 'corpus'
>;

type AddressQuery = Partial<{
  'Address.City': string;
  'Address.Street': string;
  'Address.HousingStockNumber': string;
  'Address.Corpus': string;
}>;

export type DisablingResourcesQueryParams = FiltersWithoutAddress &
  AddressQuery;
