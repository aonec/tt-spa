import { axios } from 'api/axios';
import { BuildingListResponsePagedList } from 'api/types';
import { GetHousingStocksRequestPayload } from './displayObjectsListService.types';
import { createQuery } from '@farfetched/core';
import { createEffect } from 'effector';

export const getBuildingsQuery = createQuery({
  effect: createEffect<
    GetHousingStocksRequestPayload,
    BuildingListResponsePagedList
  >(async (params) => await axios.get('Buildings', { params })),
});
