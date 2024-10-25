import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { BuildingListResponsePagedList } from 'api/types';

export const existingHousingStocksQuery = createQuery<
  [],
  BuildingListResponsePagedList
>({
  handler: () => axios.get('Buildings'),
});
