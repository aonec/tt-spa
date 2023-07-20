import {
  EIndividualDeviceOrderRule,
  EOrderByRule,
  EResourceType,
  ApartmentResponse,
} from 'api/myApi';

export type Params = {
  apartment?: ApartmentResponse;
  maxWidth?: number;
  editable?: boolean;
};

export type GetIndividualDevicesParams = {
  ApartmentId?: number;
  HousingStockId?: number;
  Resource?: EResourceType;
  LastReadingsMonth?: string;
  TakeReadings?: number;
  ApartmentIds?: number[];
  IsOpened?: boolean;
  SerialNumber?: string;
  OrderRule?: EIndividualDeviceOrderRule;
  PageNumber?: number;
  PageSize?: number;
  OrderBy?: EOrderByRule;
};
