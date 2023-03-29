import { axios } from '01/axios';
import {
  HouseManagementWithStreetsResponse,
  HousingStockListResponsePagedList,
  SubscriberStatisticsСonsumptionResponse,
} from 'myApi';
import { SubscriberStatisticsFilter } from './displayStatisticsListByManagingFirmService.types';

export const fetchManagingFirm = async (
  city: string,
): Promise<HouseManagementWithStreetsResponse[]> =>
  axios.get(
    '/HousingStocks/ExistingStreetsWithHousingStockNumbersWithhouseManagement',
    { params: { city } },
  );

export const fetchHousingStocksByManagingFirm = (
  HouseManagementId: string,
): Promise<HousingStockListResponsePagedList> =>
  axios.get('HousingStocks', { params: { HouseManagementId } });

export const fetchSubscribersStatistic = (
  filter: SubscriberStatisticsFilter,
): Promise<SubscriberStatisticsСonsumptionResponse[]> =>
  axios.get('SubscriberStatistics', { params: { ...filter } });
