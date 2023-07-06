import { axios } from '01/axios';
import { createMutation } from '@farfetched/core';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';

export const removeAssignmentMutation = createMutation({
  effect: createEffect<string, void, EffectFailDataAxiosError>((id: string) =>
    axios.delete(`IndividualSeal/Assignments/${id}`),
  ),
});
