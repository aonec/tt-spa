import { axios } from '01/axios';
import { createMutation } from '@farfetched/core';
import { createEffect } from 'effector';
import { CloseIndividualDevicePayload } from './closeIndividualDeviceService.types';
import { EffectFailDataAxiosError } from 'types';

export const closeIndivididualDeviceMutation = createMutation({
  effect: createEffect<
    CloseIndividualDevicePayload,
    void,
    EffectFailDataAxiosError
  >(({ deviceId, ...payload }) =>
    axios.post(`IndividualDevices/${deviceId}/close`, payload),
  ),
});
