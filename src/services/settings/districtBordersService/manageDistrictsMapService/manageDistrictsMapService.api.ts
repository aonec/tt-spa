import { axios } from 'api/axios';
import { createMutation, createQuery } from '@farfetched/core';
import { createEffect } from 'effector';
import { DistrictResponse } from 'myApi';
import { EffectFailDataAxiosError } from 'types';

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
