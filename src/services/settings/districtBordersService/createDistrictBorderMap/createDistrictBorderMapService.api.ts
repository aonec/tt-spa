import { axios } from '01/axios';
import { createMutation, createQuery } from '@farfetched/core';
import {
  DistrictCreateRequest,
  DistrictResponse,
  HousingStockListResponsePagedList,
} from 'myApi';

export const existingHousingStocksQuery = createQuery<
  void,
  HousingStockListResponsePagedList
>({
  handler: () => axios.get('HousingStocks'),
});

export const existingDistrictsQuery = createQuery<void, DistrictResponse[]>({
  handler: () => axios.get('IndividualSeal/Districts'),
});

export const createDistrictMutation = createMutation<
  DistrictCreateRequest,
  void
>({
  handler: (payload) => axios.post('IndividualSeal/Districts', payload),
});
