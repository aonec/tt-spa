import { SubscriberStatisticsСonsumptionResponse } from '../../api/types';
import axios from '../../api/axios';

export const getConsumptionStatistics = (params: {
  HousingStockId: number;
  MonthOfLastTransmission?: string | null;
  HotWaterSupply?: boolean | null;
  ColdWaterSupply?: boolean | null;
  Electricity?: boolean | null;
}): Promise<SubscriberStatisticsСonsumptionResponse[]> =>
  axios.get(`SubscriberStatistics`, {
    params,
  });
