import { axios } from '01/axios';
import { createMutation } from '@farfetched/core';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';

export const deleteDevice = (id: number): Promise<void> =>
  axios.post(`IndividualDevices/${id}/Delete`);

export const deleteIndividualDeviceMutation = createMutation({
  effect: createEffect<number, void, EffectFailDataAxiosError>((id: number) =>
    axios.post(`IndividualDevices/${id}/Delete`),
  ),
});
