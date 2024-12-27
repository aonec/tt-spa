import {
  EOrderByRule,
  EResourceDisconnectingOrderRule,
  EResourceDisconnectingStatus,
  EResourceDisconnectingType,
  EResourceType,
} from 'api/types';

export type DisablingResourcesFilters = Partial<{
  city: string | null;
  street: string | null;
  house: string | null;
  corpus: string | null;
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
  'Address.City': string | null;
  'Address.Street': string | null;
  'Address.HousingStockNumber': string | null;
  'Address.Corpus': string | null;
}>;

export type DisablingResourcesQueryParams = FiltersWithoutAddress &
  AddressQuery;
