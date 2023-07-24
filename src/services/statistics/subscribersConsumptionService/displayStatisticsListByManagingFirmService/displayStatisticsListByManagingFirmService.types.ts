import {
  BuildingListResponse,
  SubscriberStatisticsСonsumptionResponse,
} from 'api/types';

export type HousingStockWithApartmentStatistic = BuildingListResponse & {
  apartmentsStatistic: SubscriberStatisticsСonsumptionResponse[];
  numberOfApartments: number;
};

export type SubscriberStatisticsFilter = {
  HousingStockId: number;
  MonthOfLastTransmission?: string;
  HotWaterSupply?: boolean;
  ColdWaterSupply?: boolean;
  Electricity?: boolean;
  Heat?: boolean;
  DateLastCheckFrom?: string;
  DateLastCheckTo?: string;
  'HotWaterSupplyFilter.From'?: number;
  'HotWaterSupplyFilter.To'?: number;
  'ColdWaterSupplyFilter.From'?: number;
  'ColdWaterSupplyFilter.To'?: number;
  'ElectricityFilter.From'?: number;
  'ElectricityFilter.To'?: number;
  'HeatFilter.From'?: number;
  'HeatFilter.To'?: number;
};
