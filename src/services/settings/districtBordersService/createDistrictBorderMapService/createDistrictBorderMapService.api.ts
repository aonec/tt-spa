import { axios } from 'api/axios';
import { createMutation, createQuery } from '@farfetched/core';
import { createEffect } from 'effector';
import {
  BuildingWithCoordinatesResponsePagedList,
  DistrictCreateRequest,
  DistrictResponse,
} from 'api/types';
import { EffectFailDataAxiosError } from 'types';

export const existingHousingStocksQuery = createQuery<
  void,
  BuildingWithCoordinatesResponsePagedList
>({
  handler: () => axios.get('Buildings/Lite'),
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
