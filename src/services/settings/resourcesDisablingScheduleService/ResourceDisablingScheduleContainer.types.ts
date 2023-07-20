import {
  EOrderByRule,
  EResourceDisconnectingOrderRule,
  EResourceDisconnectingStatus,
  EResourceDisconnectingType,
  EResourceType,
} from 'api/myApi';

export type DisablingResourcesProps = {
  City?: string;
  Resource?: EResourceType;
  DisconnectingType?: EResourceDisconnectingType;
  OrderRule?: EResourceDisconnectingOrderRule;
  HousingStockId?: number;
  Status?: EResourceDisconnectingStatus;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};
