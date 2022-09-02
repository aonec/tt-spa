import {
  HousingStockListResponse,
  SubscriberStatisticsСonsumptionResponse,
} from 'myApi';

export type HousingStockWithApartmentStatistic = HousingStockListResponse & {
  apartmentsStatistic: SubscriberStatisticsСonsumptionResponse[];
};
