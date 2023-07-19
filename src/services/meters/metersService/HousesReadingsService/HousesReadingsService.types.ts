import { EIndividualDeviceOrderRule, EResourceType } from 'myApi';

export type GetHousingStocksListRequestPayload = {
  City?: string;
  Street?: string;
  BuildingNumber?: string;
  Corpus?: string;
  PageNumber?: number;
  PageSize?: number;
};

export type GetHousingStocksRequestPayload = GetHousingStocksListRequestPayload & {
  HousingStockId?: number | null;
};

export type GetIndividualDevicesListRequestPayload = {
  HousingStockId: number;
  Resource: EResourceType;
  IsOpened: boolean;
  OrderRule: EIndividualDeviceOrderRule;
  PageNumber: number;
  PageSize: number;
};
