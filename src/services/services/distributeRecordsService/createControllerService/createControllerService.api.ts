import { axios } from 'api/axios';
import { createMutation } from '@farfetched/core';
import { ControllerCreateRequest } from 'api/myApi';

export const createIndividualSealControllerMutation = createMutation<
  ControllerCreateRequest,
  string
>({
  handler: (data) => axios.post('IndividualSeal/Controllers', data),
});
