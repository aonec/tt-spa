import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import axios from '01/axios';

export const getConsumptionStatistics = ({
  id,
  month,
}: {
  id: number;
  month?: string;
}): Promise<SubscriberStatisticsСonsumptionResponse[]> =>
  axios.get(`SubscriberStatistics`, {
    params: { HousingStockId: id, MonthOfLastTransmission: month },
  });
