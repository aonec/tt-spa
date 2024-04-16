import {
  EOrderByRule,
  EResourceDisconnectingOrderRule,
  EResourceDisconnectingStatus,
  EResourceDisconnectingType,
  EResourceType,
} from 'api/types';

export type DisablingResourcesProps = {
  city?: string;
  street?: string;
  house?: string;
  corpus?: string;
  Resource?: EResourceType;
  HouseManagementId?: string;
  Sender?: string;
  From?: string;
  To?: string;
  DisconnectingType?: EResourceDisconnectingType;
  OrderRule?: EResourceDisconnectingOrderRule;
  BuildingId?: number;
  Status?: EResourceDisconnectingStatus;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
  Skip?: number;
  Take?: number;
};

export type DisablingResourcesQueryParams = Omit<
  DisablingResourcesProps,
  'city' | 'street' | 'house' | 'corpus'
> & {
  ['Address.City']?: string;
  ['Address.Street']?: string;
  ['Address.HousingStockNumber']?: string;
  ['Address.Corpus']?: string;
};
