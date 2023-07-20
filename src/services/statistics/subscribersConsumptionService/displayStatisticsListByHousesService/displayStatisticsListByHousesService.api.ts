import { axios } from 'api/axios';
import { SubscriberStatisticsFilter } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.types';
import {
  BuildingListResponsePagedList,
  SubscriberStatisticsСonsumptionResponse,
} from 'myApi';
import { HousingStockAddressForm } from './displayStatisticsListByHousesService.types';

export const fetchStatisticsByHouse = (
  params: SubscriberStatisticsFilter,
): Promise<SubscriberStatisticsСonsumptionResponse[]> =>
  axios.get(`SubscriberStatistics`, {
    params,
  });

export const fetchHousingStockId = async (
  address: HousingStockAddressForm,
): Promise<number | null> => {
  const res: BuildingListResponsePagedList = await axios.get('Buildings', {
    params: {
      ...address,
      PageSize: 1,
      PageNumber: 1,
    },
  });

  return res.items?.[0].id || null;
};
