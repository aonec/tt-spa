import { axios } from '01/axios';
import {
  GuidStringDictionaryItem,
  HousingStockFilterResponse,
  HousingStockListResponsePagedList,
  SubscriberStatisticsСonsumptionResponse,
} from 'myApi';
import { SubscriberStatisticsFilter } from './displayStatisticsListByManagingFirmService.types';

export const fetchManagingFirm = async (
  City: string,
): Promise<GuidStringDictionaryItem[]> => {
  const res = await axios.get<string, HousingStockFilterResponse>(
    '/HousingStocks/filters',
    { params: { City } },
  );
  return res?.houseManagements || [];
};

export const fetchHousingStocksByManagingFirm = (
  HouseManagementId: string,
): Promise<HousingStockListResponsePagedList> =>
  axios.get('HousingStocks', { params: { HouseManagementId } });

export const fetchSubscribersStatistic = (
  filter: SubscriberStatisticsFilter,
): Promise<SubscriberStatisticsСonsumptionResponse[]> =>
  axios.get('SubscriberStatistics', { params: { ...filter } });
