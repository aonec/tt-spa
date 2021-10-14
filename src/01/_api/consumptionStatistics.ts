import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import axios from '01/axios';

export const getConsumptionStatistics = (
  housingStockId: number
): Promise<SubscriberStatisticsСonsumptionResponse[]> =>
  axios.get(`SubscriberStatistics`, {
    params: { HousingStockId: housingStockId, Timestamp: '' },
  });
