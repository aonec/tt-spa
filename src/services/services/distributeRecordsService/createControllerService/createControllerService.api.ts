import { axios } from '01/axios';
import { createMutation } from '@farfetched/core';
import { ControllerCreateRequest } from 'myApi';

export const createIndividualSealControllerMutation = createMutation<
  ControllerCreateRequest,
  string
>({
  handler: (data) => axios.post('IndividualSeal/Controllers', data),
});
