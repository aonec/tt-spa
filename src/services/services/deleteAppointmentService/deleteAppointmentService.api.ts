import { axios } from 'api/axios';
import { createMutation } from '@farfetched/core';
import { createEffect } from 'effector';
import { EffectFailDataAxiosError } from 'types';

export const removeAppointmentMutation = createMutation({
  effect: createEffect<string, void, EffectFailDataAxiosError>((id) =>
    axios.delete(`IndividualSeal/Appointments/${id}`),
  ),
});
