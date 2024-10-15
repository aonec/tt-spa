import { createQuery } from '@farfetched/core';
import { axios } from 'api/axios';
import { StatusResponse } from 'api/mvitu.types';

export const mvituIntegrationQuery = createQuery<[], StatusResponse>({
  handler: () => axios.get('mvitu/Integrations'),
});
