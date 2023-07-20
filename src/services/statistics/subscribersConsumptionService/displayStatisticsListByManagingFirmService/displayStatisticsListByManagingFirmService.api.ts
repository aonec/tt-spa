import { axios } from 'api/axios';
import {
  BuildingListResponsePagedList,
  HouseManagementWithStreetsResponse,
  SubscriberStatisticsСonsumptionResponse,
} from 'myApi';
import { SubscriberStatisticsFilter } from './displayStatisticsListByManagingFirmService.types';

export const fetchManagingFirm = async (
  city: string,
): Promise<HouseManagementWithStreetsResponse[]> =>
  axios.get('Buildings/ExistingStreetsWithBuildingNumbersWithHouseManagement', {
    params: { city },
  });

export const fetchHousingStocksByManagingFirm = (
  HouseManagementId: string,
): Promise<BuildingListResponsePagedList> =>
  axios.get('Buildings', { params: { HouseManagementId } });

export const fetchSubscribersStatistic = (
  filter: SubscriberStatisticsFilter,
): Promise<SubscriberStatisticsСonsumptionResponse[]> =>
  axios.get('SubscriberStatistics', { params: { ...filter } });
