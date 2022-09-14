import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import axios from '01/axios';
import { SubscriberStatisticsFilter } from '01/features/statistics/subscribersConsumption/displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.types';

export const getConsumptionStatistics = (
  params: SubscriberStatisticsFilter
): Promise<SubscriberStatisticsСonsumptionResponse[]> =>
  axios.get(`SubscriberStatistics`, {
    params,
  });
