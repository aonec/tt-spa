import { axios } from '01/axios';
import { createQuery } from '@farfetched/core';
import { DistrictResponse, HousingStockListResponsePagedList } from 'myApi';

export const existingHousingStocksQuery = createQuery<
  void,
  HousingStockListResponsePagedList
>({
  handler: () => axios.get('HousingStocks'),
});

export const existingDistrictsQuery = createQuery<void, DistrictResponse[]>({
  handler: () => axios.get('IndividualSeal/Districts'),
});
