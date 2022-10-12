import { EIndividualDeviceOrderRule, EOrderByRule, EResourceType } from 'myApi';

export type Params = {
  apartmentId?: number;
  maxWidth?: number;
  readonly?: boolean;
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
