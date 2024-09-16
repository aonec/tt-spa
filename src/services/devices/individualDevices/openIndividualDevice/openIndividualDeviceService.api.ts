import { createMutation } from '@farfetched/core';
import { axios } from 'api/axios';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';

export const reopenIndividualDeviceMutation = createMutation({
  effect: createEffect<number, void, EffectFailDataAxiosError>(
    async (deviceId: number) => {
      return await axios.post(`IndividualDevices/${deviceId}/reopen`);
    },
  ),
});
