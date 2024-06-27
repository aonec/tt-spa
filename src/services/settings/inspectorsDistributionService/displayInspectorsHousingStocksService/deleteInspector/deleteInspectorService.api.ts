import { createMutation } from '@farfetched/core';
import { axios } from 'api/axios';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';

export const deleteInspectorMutation = createMutation({
  effect: createEffect<number, void, EffectFailDataAxiosError>((inspectorId) =>
    axios.delete(`Inspectors/${inspectorId}`),
  ),
});
