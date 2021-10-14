import { SubscriberStatisticsСonsumptionResponse } from 'myApi';
import axios from '01/axios';

export const getConsumptionStatistics = (): Promise<
  SubscriberStatisticsСonsumptionResponse[]
> => axios.get('SubscriberStatistics');
