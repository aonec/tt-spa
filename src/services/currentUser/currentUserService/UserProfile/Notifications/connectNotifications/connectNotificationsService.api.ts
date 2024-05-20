import { createMutation } from '@farfetched/core';
import { axios } from 'api/axios';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';

export const connectChannelMutation = createMutation({
  effect: createEffect<string, void, EffectFailDataAxiosError>(
    (token): Promise<void> =>
      axios.post('/Notifications/Channels/confirm', { token }),
  ),
});
