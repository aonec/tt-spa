import { axios } from 'api/axios';
import { SubscriberStatisticsFilter } from '../displayStatisticsListByManagingFirmService/displayStatisticsListByManagingFirmService.types';
import {
  BuildingListResponsePagedList,
  SubscriberStatisticsСonsumptionResponse,
} from 'api/types';
import { HousingStockAddressForm } from './displayStatisticsListByHousesService.types';
import { createQuery } from '@farfetched/core';
import { createEffect } from 'effector';

export const fetchStatisticsByHouse = (
  params: SubscriberStatisticsFilter,
): Promise<SubscriberStatisticsСonsumptionResponse[]> =>
  axios.get(`SubscriberStatistics`, {
    params,
  });

export const fetchHousingStockIdQuery = createQuery({
  effect: createEffect<HousingStockAddressForm, number | null>(
    async (address) => {
      const res: BuildingListResponsePagedList = await axios.get('Buildings', {
        params: {
          ...address,
          PageSize: 1,
          PageNumber: 1,
        },
      });

      return res.items?.[0].id || null;
    },
  ),
});
