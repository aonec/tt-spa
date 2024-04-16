import {
  EOrderByRule,
  EResourceDisconnectingOrderRule,
  EResourceDisconnectingStatus,
  EResourceDisconnectingType,
  EResourceType,
} from 'api/types';

export type DisablingResourcesProps = {
  addressCity?: string;
  addressStreet?: string;
  addressHousingStockNumber?: string;
  addressCorpus?: string;
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
