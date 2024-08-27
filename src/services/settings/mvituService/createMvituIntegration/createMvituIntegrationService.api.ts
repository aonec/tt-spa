import { createMutation } from '@farfetched/core';
import { axios } from 'api/axios';
import { IntegrationInfoRequest } from 'api/mvitu.types';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';

export const createOrUpdateIntegration = createMutation({
  effect: createEffect<IntegrationInfoRequest, void, EffectFailDataAxiosError>(
    (payload): Promise<void> =>
      axios.post('mvitu/Integrations/CreateOrUpdate', payload),
  ),
});
