import { createEffect } from 'effector';
import { createMutation, createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { EffectFailDataAxiosError } from 'types';
import { DistrictResponse } from 'api/types';
import { UpdateDistrictRequestPayload } from './manageDistrictsMapService.types';

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

export const deleteDistrictMutation = createMutation({
  effect: createEffect<string, void, EffectFailDataAxiosError>((id) =>
    axios.delete(`IndividualSeal/Districts/${id}`, {
      params: { forced: true },
    }),
  ),
});

export const updateDistrictMutation = createMutation({
  effect: createEffect<
    UpdateDistrictRequestPayload,
    void,
    EffectFailDataAxiosError
  >(({ id, ...data }) => axios.put(`IndividualSeal/Districts/${id}`, data)),
});
