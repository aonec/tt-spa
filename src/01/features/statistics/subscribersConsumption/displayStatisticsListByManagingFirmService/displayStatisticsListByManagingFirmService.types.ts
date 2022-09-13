import {
  HousingStockListResponse,
  SubscriberStatisticsСonsumptionResponse,
} from 'myApi';

export type HousingStockWithApartmentStatistic = HousingStockListResponse & {
  apartmentsStatistic: SubscriberStatisticsСonsumptionResponse[];
};

export type SubscriberStatisticsFilter = {
  HousingStockId: number;
  MonthOfLastTransmission?: string;
  HotWaterSupply?: boolean;
  ColdWaterSupply?: boolean;
  Electricity?: boolean;
  DateLastCheckFrom?: string;
  DateLastCheckTo?: string;
  HotWaterSupplyConsumptionFrom?: number;
  HotWaterSupplyConsumptionTo?: number;
  ColdWaterSupplyConsumptionFrom?: number;
  ColdWaterSupplyConsumptionTo?: number;
  ElectricitySupplyConsumptionFrom?: number;
  ElectricitySupplyConsumptionTo?: number;
};
