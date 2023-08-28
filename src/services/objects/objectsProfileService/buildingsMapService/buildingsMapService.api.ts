import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { BuildingListResponsePagedList } from 'api/types';

export const existingHousingStocksQuery = createQuery<
  void,
  BuildingListResponsePagedList
>({
  handler: () => axios.get('Buildings'),
});
