import { axios } from '01/axios';
import { createMutation, createQuery } from '@farfetched/core';
import { createEffect } from 'effector';
import {
  DistrictCreateRequest,
  DistrictResponse,
  HousingStockListResponsePagedList,
} from 'myApi';
import { EffectFailDataAxiosError } from 'types';

export const existingHousingStocksQuery = createQuery<
  void,
  HousingStockListResponsePagedList
>({
  handler: () => axios.get('HousingStocks'),
});

export const existingDistrictsQuery = createQuery<
  void,
  DistrictResponse[] | null
>({
  handler: async () => {
    const districts: DistrictResponse[] = await axios.get(
      'IndividualSeal/Districts',
    );

    if (!districts) return null;

    return districts.reverse();
  },
});

export const createDistrictMutation = createMutation({
  effect: createEffect<DistrictCreateRequest, void, EffectFailDataAxiosError>(
    (payload) => axios.post('IndividualSeal/Districts', payload),
  ),
});
