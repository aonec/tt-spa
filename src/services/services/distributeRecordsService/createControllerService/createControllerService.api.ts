import { axios } from 'api/axios';
import { createMutation } from '@farfetched/core';
import { ControllerCreateRequest } from 'api/types';

export const createIndividualSealControllerMutation = createMutation<
  ControllerCreateRequest,
  string
>({
  handler: (data) => axios.post('IndividualSeal/Controllers', data),
});
