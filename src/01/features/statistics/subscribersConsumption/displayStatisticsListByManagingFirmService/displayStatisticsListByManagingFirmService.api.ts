import { axios } from '01/axios';
import {
  GuidStringDictionaryItem,
  HousingStockFilterResponse,
  HousingStockListResponsePagedList,
  SubscriberStatisticsСonsumptionResponse,
} from 'myApi';

export const fetchManagingFirm = async (): Promise<
  GuidStringDictionaryItem[]
> => {
  const res = await axios.get<void, HousingStockFilterResponse>(
    '/HousingStocks/filters'
  );
  return res?.houseManagements || [];
};

export const fetchHousingStocksByManagingFirm = (
  HouseManagementId: string
): Promise<HousingStockListResponsePagedList> =>
  axios.get('HousingStocks', { params: { HouseManagementId } });

export const fetchSubscribersStatistic = (
  HousingStockId: number
): Promise<SubscriberStatisticsСonsumptionResponse[]> =>
  axios.get('SubscriberStatistics', { params: { HousingStockId } });
